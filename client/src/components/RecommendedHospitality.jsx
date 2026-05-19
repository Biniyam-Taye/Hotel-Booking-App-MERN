import React from 'react'
import { Link } from 'react-router-dom'
import Title from './Title'
import HospitalityCard from './HospitalityCard'
import { useAppContext } from '../context/AppContext'

const RecommendedHospitality = () => {
    const { hospitalities } = useAppContext()

    if (!hospitalities?.length) return null

    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 py-20'>
            <Title
                title='Hotel Hospitality'
                subTitle='Discover dining, spa, massage, tours, and services from our partner hotels.'
            />

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full mt-4'>
                {hospitalities.slice(0, 4).map((item) => (
                    <HospitalityCard key={item._id} item={item} />
                ))}
            </div>

            {hospitalities.length > 4 && (
                <Link
                    to="/hospitality"
                    className="mt-10 px-8 py-3 rounded-xl bg-gradient-to-r from-[#49B9FF] to-blue-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                    View all hospitality
                </Link>
            )}
        </div>
    )
}

export default RecommendedHospitality
