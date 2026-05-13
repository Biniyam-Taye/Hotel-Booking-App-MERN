import React from 'react'
import HotelCard from './HotelCard'
import { useAppContext } from '../context/AppContext'

const FeaturedDestination = () => {
    const { rooms, navigate } = useAppContext()

    return rooms.length > 0 && (
        <div className='relative flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 py-24 overflow-hidden bg-white'>
            {/* Colorful background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/60 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-14 relative z-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 px-4 py-1.5 rounded-full text-sm font-medium text-blue-600 mb-4 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#49B9FF] animate-pulse"></span>
                    Handpicked For You
                </div>
                <h2 className='font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#49B9FF] to-blue-700">Destinations</span>
                </h2>
                <p className='text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed'>
                    Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.
                </p>
            </div>

            {/* Cards Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 w-full relative z-10'>
                {rooms.slice(0, 4).map((room, index) => (
                    <HotelCard key={room._id} room={room} index={index} />
                ))}
            </div>

            {/* View All Button */}
            <button
                onClick={() => { navigate('/rooms'); scrollTo(0, 0) }}
                className='relative mt-16 group overflow-hidden px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_8px_30px_rgba(73,185,255,0.4)] bg-gradient-to-r from-[#49B9FF] to-blue-600 text-white shadow-lg shadow-blue-300/40'
            >
                <span className="relative z-10 flex items-center gap-2">
                    Explore All Destinations
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </button>
        </div>
    )
}

export default FeaturedDestination
