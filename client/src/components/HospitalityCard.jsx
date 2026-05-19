import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const HospitalityCard = ({ item }) => {
    const { currency } = useAppContext()

    return (
        <Link
            to="/hospitality"
            onClick={() => scrollTo(0, 0)}
            className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(73,185,255,0.15)] transition-all duration-500"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-blue-600 rounded-full">
                    {item.category}
                </span>
            </div>
            <div className="p-5">
                <p className="text-xs text-blue-500 font-medium mb-1">{item.hotel?.name}</p>
                <h3 className="font-playfair text-lg font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                {item.description && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-bold text-gray-900">{currency}{item.price}</p>
                    <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                        View
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default HospitalityCard
