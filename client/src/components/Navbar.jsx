import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";


const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
)

// Navbar Component
const Navbar = () => {

    // Navigation links for both desktop & mobile
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];

    // State for scroll-based styling
    const [isScrolled, setIsScrolled] = useState(false);

    // State for mobile menu (open/close)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Clerk authentication functions
    const { openSignIn } = useClerk();
    const location = useLocation();

    const { user, navigate, isOwner, setShowHotelReg } = useAppContext()

    // Add scroll listener to change navbar style
    useEffect(() => {
        if (location.pathname !== '/') {
            setIsScrolled(true);
            return;
        } else {
            setIsScrolled(false)
        }
        setIsScrolled(prev => location.pathname !== '/' ? true : prev);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);

        // Cleanup listener
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled
            ? "bg-white/80 shadow-[0_4px_30px_rgba(0,0,0,0.08)] text-gray-700 backdrop-blur-xl py-5 border-b border-white/60"
            : "py-7 md:py-8"
            }`}>

            {/* Logo */}
            <Link to='/' className="group flex items-center gap-2">
                <img src={assets.logo} alt="logo" className={`h-11 transition-all duration-500 group-hover:scale-105 ${isScrolled && "invert opacity-80"}`} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
                {navLinks.map((link, i) => (
                    <a
                        key={i}
                        href={link.path}
                        className={`relative px-5 py-2.5 text-base font-medium rounded-xl transition-all duration-300 group
                            ${isScrolled
                                ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                : "text-white/80 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        {link.name}
                        {/* Animated underline */}
                        <span className={`absolute bottom-1.5 left-5 right-5 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                            ${isScrolled ? "bg-[#49B9FF]" : "bg-white"}`}
                        />
                    </a>
                ))}

                {/* Dashboard / List Hotel button */}
                {user && (
                    <button
                        onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)}
                        className={`ml-3 px-6 py-2.5 text-base font-semibold rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95
                            ${isScrolled
                                ? "border-gray-300 text-gray-700 hover:border-[#49B9FF] hover:text-[#49B9FF] hover:shadow-[0_0_12px_rgba(73,185,255,0.3)]"
                                : "border-white/40 text-white hover:bg-white/15 hover:border-white hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                            }`}
                    >
                        {isOwner ? 'Dashboard' : 'List Your Hotel'}
                    </button>
                )}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-3">
                {/* Search icon */}
                <button className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95
                    ${isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"}`}>
                    <img src={assets.searchIcon} alt="search" className={`${isScrolled && 'invert'} h-6 w-6`} />
                </button>

                {user ? (
                    <div className={`rounded-full ring-2 ring-offset-2 transition-all duration-300 hover:ring-[#49B9FF]
                        ${isScrolled ? "ring-gray-200 ring-offset-white" : "ring-white/30 ring-offset-transparent"}`}>
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
                            </UserButton.MenuItems>
                        </UserButton>
                    </div>
                ) : (
                    <button
                        onClick={openSignIn}
                        className={`relative overflow-hidden px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group/login
                            ${isScrolled
                                ? "bg-gradient-to-r from-[#49B9FF] to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                                : "bg-white text-gray-900 shadow-lg hover:shadow-white/30"
                            }`}
                    >
                        <span className="relative z-10">Login</span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/login:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                    </button>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-3 md:hidden">
                {user && (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>
                )}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"}`}
                >
                    <img src={assets.menuIcon} alt="menu" className={`${isScrolled && "invert"} h-4 w-4`} />
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <img src={assets.logo} alt="logo" className="h-7 invert opacity-80" />
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <img src={assets.closeIcon} alt="close" className="h-5 w-5" />
                    </button>
                </div>

                {/* Mobile Nav Links */}
                <div className="flex flex-col px-6 pt-6 gap-1 flex-1">
                    {navLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 font-medium text-base hover:bg-blue-50 hover:text-[#49B9FF] transition-all duration-200 group"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#49B9FF] transition-colors duration-200"></span>
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile CTA buttons */}
                <div className="px-6 pb-10 flex flex-col gap-3">
                    {user && (
                        <button
                            onClick={() => { isOwner ? navigate('/owner') : setShowHotelReg(true); setIsMenuOpen(false); }}
                            className="w-full py-3 rounded-xl border-2 border-[#49B9FF] text-[#49B9FF] font-semibold transition-all hover:bg-[#49B9FF] hover:text-white"
                        >
                            {isOwner ? 'Dashboard' : 'List Your Hotel'}
                        </button>
                    )}
                    {!user && (
                        <button
                            onClick={openSignIn}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#49B9FF] to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
