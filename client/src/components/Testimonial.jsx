import React from 'react'
import { testimonials } from '../assets/assets';
import StarRating from './StarRating';

const Testimonial = () => {
    return (
        <div className='relative flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 py-24 overflow-hidden bg-white group/section'>
            {/* Ambient light blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none transition-all duration-1000 group-hover/section:scale-110"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none transition-all duration-1000 group-hover/section:scale-110"></div>

            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-16 relative z-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 px-5 py-2 rounded-full text-sm font-medium text-blue-600 mb-5 shadow-sm cursor-default transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(79,70,229,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Guest Experiences
                </div>
                <h2 className='font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-5'>
                    What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Guests Say</span>
                </h2>
                <div className="flex items-center gap-3 mb-5 group/divider cursor-default">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-indigo-500 transition-all duration-700 group-hover/divider:w-24"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 transition-all duration-500 group-hover/divider:scale-150 group-hover/divider:shadow-[0_0_10px_rgba(99,102,241,0.6)]"></div>
                    <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-indigo-500 transition-all duration-700 group-hover/divider:w-24"></div>
                </div>
                <div className="relative group/desc cursor-default max-w-2xl">
                    {/* Background glass reveal */}
                    <div className="absolute inset-0 -m-4 rounded-2xl bg-gradient-to-r from-blue-50/0 via-indigo-50/0 to-blue-50/0 scale-95 opacity-0 group-hover/desc:opacity-100 group-hover/desc:scale-100 group-hover/desc:from-blue-50/80 group-hover/desc:via-indigo-50/60 group-hover/desc:to-blue-50/80 transition-all duration-500 border border-transparent group-hover/desc:border-indigo-100 backdrop-blur-sm shadow-xl shadow-indigo-500/0 group-hover/desc:shadow-indigo-500/5"></div>
                    <p className='relative z-10 text-gray-500 text-base md:text-lg leading-relaxed transition-all duration-500 group-hover/desc:text-gray-900 group-hover/desc:text-xl group-hover/desc:font-semibold'>
                        Discover why discerning travelers consistently choose BiniStay for their exclusive and luxurious accommodations around the world.
                    </p>
                    {/* Bottom accent line that grows on hover */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full group-hover/desc:w-3/4 transition-all duration-700"></div>
                </div>
            </div>

            {/* Testimonial Cards Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full relative z-10'>
                {testimonials.map((testimonial, i) => (
                    <div key={testimonial.id} className='group relative p-8 rounded-3xl bg-white border border-gray-100 cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(79,70,229,0.08)]'>
                        {/* Hover Gradient Border Effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-${i % 2 === 0 ? 'left' : 'right'}`} />

                        {/* Huge Quote Icon background */}
                        <div className="absolute top-6 right-6 text-[100px] font-serif leading-none text-gray-50 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                            "
                        </div>

                        {/* Author Info */}
                        <div className='flex items-center gap-4 mb-6 relative z-10'>
                            <div className="relative">
                                <img className='w-14 h-14 rounded-full object-cover border-2 border-transparent group-hover:border-indigo-100 transition-all duration-300' src={testimonial.image} alt={testimonial.name} />
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                            </div>
                            <div>
                                <p className='font-playfair text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors'>{testimonial.name}</p>
                                <p className='text-gray-400 text-sm font-medium'>{testimonial.address}</p>
                            </div>
                        </div>

                        {/* Stars */}
                        <div className='flex items-center gap-1 mb-5 relative z-10 bg-orange-50 w-max px-3 py-1 rounded-full'>
                            <StarRating />
                        </div>

                        {/* Review text */}
                        <p className='text-gray-600 text-base leading-relaxed italic relative z-10 group-hover:text-gray-800 transition-colors duration-300'>
                            "{testimonial.review}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial
