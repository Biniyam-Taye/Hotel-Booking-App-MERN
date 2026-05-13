import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="relative bg-[#050B14] px-6 md:px-16 lg:px-24 xl:px-32 pt-20 w-full text-gray-400 overflow-hidden border-t border-white/5">
            {/* Subtle top glow from the border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

            <div className="flex flex-col md:flex-row justify-between w-full gap-12 lg:gap-20 border-b border-white/10 pb-16 relative z-10">

                {/* Left Logo + Text */}
                <div className="md:max-w-md">
                    <img alt="logo" className="mb-6 h-8 md:h-10 invert opacity-90 hover:opacity-100 transition-opacity" src={assets.logo} />
                    <p className="mt-4 text-sm leading-relaxed text-gray-400">
                        Book your perfect stay with us. We offer seamless hotel reservations, trusted listings, and the best prices to make your travel experience smooth, comfortable, and memorable.
                    </p>
                    <div className="flex items-center gap-4 mt-8">
                        {/* Social Icons with hover glow */}
                        {[assets.instagramIcon, assets.facebookIcon, assets.twitterIcon, assets.linkendinIcon].map((icon, i) => (
                            <a href="#" key={i} className="group relative p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                                <div className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                                <img src={icon} alt="social-icon" className="w-5 invert opacity-70 group-hover:opacity-100 transition-opacity relative z-10" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Columns */}
                <div className="flex-1 flex flex-wrap md:justify-end gap-12 lg:gap-24">

                    {/* Company */}
                    <div>
                        <h2 className="font-playfair text-lg text-white mb-6 tracking-wide">Company</h2>
                        <ul className="text-sm space-y-4">
                            {['About', 'Careers', 'Press', 'Blog', 'Partners'].map(link => (
                                <li key={link}>
                                    <a href="#" className="relative group/link flex items-center w-max">
                                        <span className="w-0 h-[1px] bg-blue-400 mr-0 transition-all duration-300 group-hover/link:w-3 group-hover/link:mr-2"></span>
                                        <span className="text-gray-400 group-hover/link:text-blue-400 transition-colors duration-300">{link}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h2 className="font-playfair text-lg text-white mb-6 tracking-wide">Resources</h2>
                        <ul className="text-sm space-y-4">
                            {['Help', 'Safety', 'Cancel', 'Support', 'Access'].map(link => (
                                <li key={link}>
                                    <a href="#" className="relative group/link flex items-center w-max">
                                        <span className="w-0 h-[1px] bg-blue-400 mr-0 transition-all duration-300 group-hover/link:w-3 group-hover/link:mr-2"></span>
                                        <span className="text-gray-400 group-hover/link:text-blue-400 transition-colors duration-300">{link}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Contact / Info */}
                    <div>
                        <h2 className="font-playfair text-lg text-white mb-6 tracking-wide">Contact</h2>
                        <ul className="text-sm space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span>123 Luxury Ave, Suite 500<br />New York, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <a href="mailto:hello@binistay.com" className="hover:text-blue-400 transition-colors">hello@binistay.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span>+1 (800) 123-4567</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Copyright Row */}
            <div className='flex flex-col md:flex-row gap-4 items-center justify-between py-8 relative z-10 text-xs md:text-sm text-gray-500'>
                <p>
                    Copyright © {new Date().getFullYear()} - <span className="text-gray-400 font-medium">Biniyam Taye</span>. All rights reserved.
                </p>
                <ul className="flex items-center gap-6">
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Sitemap</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
