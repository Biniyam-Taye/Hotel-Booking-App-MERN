import React from 'react'
import { assets } from '../assets/assets'

const Newslatter = () => {
    return (
        <div className="relative flex flex-col items-center max-w-6xl w-full mx-auto px-6 md:px-12 py-24 my-20 bg-[#0B0F19] rounded-[2.5rem] text-white overflow-hidden group/news shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            
            {/* Animated Space-like Background Effects */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none group-hover/news:bg-blue-500/40 transition-colors duration-1000"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none group-hover/news:bg-indigo-500/30 transition-colors duration-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.2)]"></div>

            {/* Glowing Border Wrap */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none group-hover/news:border-white/10 transition-colors duration-500"></div>

            <div className="relative z-10 flex flex-col items-center w-full">
                {/* Accent Badge */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium text-blue-300 mb-8 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    Weekly Travel Inspiration
                </div>

                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-6">
                    Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Inspired</span>
                </h2>
                
                <p className="text-gray-400 text-center text-base md:text-lg max-w-2xl mb-12 leading-relaxed">
                    Join our VIP newsletter and be the first to discover hidden gems, exclusive resort offers, and highly curated travel itineraries.
                </p>

                {/* Input form */}
                <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-xl gap-3">
                    <div className="relative w-full group/input">
                        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-focus-within/input:opacity-50 blur transition-opacity duration-500"></div>
                        <input 
                            type="email" 
                            className="relative w-full bg-[#131B2C] text-white px-6 py-4 border border-white/10 rounded-xl outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-500" 
                            placeholder="Enter your VIP email..." 
                        />
                    </div>
                    
                    <button className="relative group/btn w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 overflow-hidden flex-shrink-0">
                        <span className="relative z-10 flex items-center gap-2">
                            Subscribe
                            <svg className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                    </button>
                </div>

                <p className="text-gray-500 mt-8 text-xs text-center flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
            </div>
        </div>
    )
}

export default Newslatter