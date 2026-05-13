import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = () => {

    const { navigate, getToken, axios, setSearchedCities } = useAppContext()
    const [destination, setDestination] = useState("")
    const onSearch = async (e) => {
        e.preventDefault()
        navigate(`/rooms?destination=${destination}`)
        // call api to save recent searched city
        await axios.post('/api/user/store-recent-search', {
            recentSearchedCity:
                destination
        }, { headers: { Authorization: `Bearer ${await getToken()}` } });

        // add destination to searchedCities max 3 recent searched cities
        setSearchedCities((prevSearchedCities) => {
            const updatedSearchedCities = [...prevSearchedCities, destination];
            if (updatedSearchedCities.length > 3) {
                updatedSearchedCities.shift();
            }
            return updatedSearchedCities;
        })
    }

    return (
        <div className='flex flex-col items-center justify-center px-6 md:px-16 lg:px-24
         xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen relative overflow-hidden text-center'>
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
            
            <div className="relative z-10 w-full flex flex-col items-center animate-fade-in-up mt-16">
                <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium hover:bg-white/30 transition-colors cursor-default mb-4'>
                    <span className="w-2 h-2 rounded-full bg-[#49B9FF] animate-pulse"></span>
                    The Ultimate Hotel Experience
                </div>
                
                <h1 className='font-playfair text-3xl md:text-5xl lg:text-6xl font-bold max-w-4xl tracking-tight drop-shadow-lg leading-tight'>
                    Discover Your Perfect <span className="text-[#49B9FF]">Getaway</span> Destination
                </h1>
                
                <p className='max-w-xl mt-4 text-sm md:text-base text-gray-100 font-light drop-shadow-md'>
                    Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts.
                </p>
                
                {/* Unified White Pill Search Bar */}
                <form onSubmit={onSearch} className='bg-white text-gray-800 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-2 mt-10 flex flex-col md:flex-row items-center w-full max-w-4xl transition-transform hover:scale-[1.01] duration-300 relative z-20'>
                    
                    {/* Destination */}
                    <div className="flex-1 w-full md:w-auto hover:bg-gray-100 rounded-full px-6 py-2 transition-colors cursor-pointer relative group">
                        <label htmlFor="destinationInput" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 cursor-pointer">Where</label>
                        <input onChange={e => setDestination(e.target.value)} value={destination} list='destinations' id="destinationInput" type="text" className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 outline-none truncate" placeholder="Search destinations" required />
                        <datalist id='destinations'>
                            {cities.map((city, index) => (
                                <option value={city} key={index} />
                            ))}
                        </datalist>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                    {/* Check In */}
                    <div className="flex-1 w-full md:w-auto hover:bg-gray-100 rounded-full px-6 py-2 transition-colors cursor-pointer relative group">
                        <label htmlFor="checkIn" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 cursor-pointer">Check in</label>
                        <input id="checkIn" type="date" className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none cursor-pointer [color-scheme:light]" />
                    </div>

                    <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                    {/* Check Out */}
                    <div className="flex-1 w-full md:w-auto hover:bg-gray-100 rounded-full px-6 py-2 transition-colors cursor-pointer relative group">
                        <label htmlFor="checkOut" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 cursor-pointer">Check out</label>
                        <input id="checkOut" type="date" className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none cursor-pointer [color-scheme:light]" />
                    </div>

                    <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                    {/* Guests & Search Button Container */}
                    <div className="flex w-full md:w-auto items-center hover:bg-gray-100 rounded-full pl-6 pr-2 py-2 transition-colors cursor-pointer group">
                        <div className="flex-1 mr-4">
                            <label htmlFor="guests" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 cursor-pointer">Who</label>
                            <input min={1} max={4} id="guests" type="number" className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 outline-none" placeholder="Add guests" />
                        </div>
                        
                        {/* Search Button */}
                        <button className='flex items-center justify-center rounded-full bg-[#49B9FF] hover:bg-blue-500 w-12 h-12 md:w-14 md:h-14 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex-shrink-0'>
                            <img src={assets.searchIcon} alt="searchIcon" className='h-5 w-5' style={{ filter: 'brightness(0) invert(1)' }} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Hero