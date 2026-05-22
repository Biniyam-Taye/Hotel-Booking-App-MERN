import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
)

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Rooms', path: '/rooms' },
        { name: 'Hospitality', path: '/hospitality' },
        { name: 'Experience', path: '/experience' },
        { name: 'About', path: '/about' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const location = useLocation();
    const { user, navigate, logout } = useAppContext()

    useEffect(() => {
        // Smooth scroll to top on route change
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Update scrolled state based on pathname
        if (location.pathname !== '/') {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }

        const handleScroll = () => {
            if (location.pathname !== '/') {
                setIsScrolled(true);
            } else {
                setIsScrolled(window.scrollY > 10);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-16 lg:px-24 xl:px-32 pt-4 md:pt-5">
            <div className={`flex items-center justify-between w-full transition-all duration-500 rounded-[3.5rem] px-5 md:px-8 lg:px-10 ${isScrolled
                ? "bg-[#F6F9FC]/95 text-gray-700 backdrop-blur-xl py-4 md:py-5 shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-gray-200"
                : "py-5 md:py-6 bg-white/10 backdrop-blur-md border border-transparent shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
                }`}>

                <Link to='/' className="group flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className={`h-11 transition-all duration-500 group-hover:scale-105 ${isScrolled && "invert opacity-80"}`} />
                </Link>

                <div className="hidden md:flex items-center gap-1 lg:gap-2">
                    {navLinks.map((link, i) => (
                        <Link
                            key={i}
                            to={link.path}
                            className={`relative px-5 py-2.5 text-base font-medium rounded-xl transition-all duration-300 group
                            ${isScrolled
                                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    : "text-white/80 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            {link.name}
                            <span className={`absolute bottom-1.5 left-5 right-5 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                            ${isScrolled ? "bg-[#49B9FF]" : "bg-white"}`}
                            />
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <button className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95
                    ${isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"}`}>
                        <img src={assets.searchIcon} alt="search" className={`${isScrolled && 'invert'} h-6 w-6`} />
                    </button>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className={`flex items-center gap-2 rounded-full ring-2 ring-offset-2 transition-all duration-300 hover:ring-[#49B9FF]
                                ${isScrolled ? "ring-gray-200 ring-offset-white" : "ring-white/30 ring-offset-transparent"}`}
                            >
                                <img src={user.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                            </button>
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                    <p className="px-4 py-2 text-sm font-semibold text-gray-800 truncate">{user.username}</p>
                                    <button
                                        onClick={() => { navigate('/my-bookings'); setProfileOpen(false); }}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <BookIcon /> My Bookings
                                    </button>
                                    <button
                                        onClick={() => { logout(); setProfileOpen(false); }}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className={`px-6 py-2.5 text-base font-semibold rounded-xl transition-all
                                ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:bg-white/10"}`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className={`px-6 py-3 rounded-xl text-base font-semibold transition-all hover:scale-105
                                ${isScrolled
                                        ? "bg-gradient-to-r from-[#49B9FF] to-blue-600 text-white shadow-lg"
                                        : "bg-white text-gray-900 shadow-lg"
                                    }`}
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 md:hidden">
                    {user ? (
                        <img src={user.image} alt="" className="w-9 h-9 rounded-full" />
                    ) : null}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"}`}
                    >
                        <img src={assets.menuIcon} alt="menu" className={`${isScrolled && "invert"} h-4 w-4`} />
                    </button>
                </div>
            </div>

            <div className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <img src={assets.logo} alt="logo" className="h-7 invert opacity-80" />
                    <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100">
                        <img src={assets.closeIcon} alt="close" className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex flex-col px-6 pt-6 gap-1 flex-1">
                    {navLinks.map((link, i) => (
                        <Link
                            key={i}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-[#49B9FF]"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="px-6 pb-10 flex flex-col gap-3">
                    {user ? (
                        <>
                            <button onClick={() => { navigate('/my-bookings'); setIsMenuOpen(false); }} className="w-full py-3 rounded-xl border-2 border-[#49B9FF] text-[#49B9FF] font-semibold">
                                My Bookings
                            </button>
                            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-3 text-center rounded-xl border-2 border-[#49B9FF] text-[#49B9FF] font-semibold">
                                Login
                            </Link>
                            <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-[#49B9FF] to-blue-600 text-white font-semibold">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
