import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const AuthGuard = ({ children }) => {
    const { user, isOwner, authLoading } = useAppContext()
    const location = useLocation()

    if (authLoading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    const isAuthPage = ['/login', '/signup'].includes(location.pathname)
    const isOwnerPath = location.pathname.startsWith('/owner')

    if (user && isOwner && !isOwnerPath && !isAuthPage) {
        return <Navigate to="/owner" replace />
    }

    if (user && !isOwner && isOwnerPath) {
        return <Navigate to="/" replace />
    }

    if (!user && isOwnerPath) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default AuthGuard
