import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = "ETB ";
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(() => localStorage.getItem('token'))
    const [isOwner, setIsOwner] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([]);

    const applyAuth = (authToken, userData) => {
        localStorage.setItem('token', authToken);
        setToken(authToken);
        setUser(userData);
        setIsOwner(userData.role === 'hotelOwner');
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }

    const clearAuth = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        delete axios.defaults.headers.common['Authorization'];
    }

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/');
            if (data.success) {
                setIsOwner(data.isOwner);
                setSearchedCities(data.recentSearchedCities || []);
                setUser(prev => ({
                    ...prev,
                    role: data.role,
                    username: data.username,
                    email: data.email,
                    image: data.image,
                    isOwner: data.isOwner,
                }));
            }
        } catch {
            clearAuth();
        } finally {
            setAuthLoading(false);
        }
    }

    const login = async (email, password) => {
        const { data } = await axios.post('/api/auth/login', { email, password });
        if (!data.success) throw new Error(data.message);
        applyAuth(data.token, data.user);
        return data.user;
    }

    const signup = async (payload) => {
        const { data } = await axios.post('/api/auth/signup', payload);
        if (!data.success) throw new Error(data.message);
        applyAuth(data.token, data.user);
        return data.user;
    }

    const logout = () => {
        clearAuth();
        navigate('/');
    }

    const getToken = async () => token;

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms')
            if (data.success) {
                setRooms(data.rooms)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const stored = localStorage.getItem('user');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    setUser(parsed);
                    setIsOwner(parsed.role === 'hotelOwner');
                } catch { /* ignore */ }
            }
            fetchUser();
        } else {
            setAuthLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        fetchRooms();
    }, [])

    const value = {
        currency,
        navigate,
        user,
        token,
        authLoading,
        isOwner,
        login,
        signup,
        logout,
        getToken,
        axios,
        searchedCities,
        setSearchedCities,
        rooms,
        setRooms,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
