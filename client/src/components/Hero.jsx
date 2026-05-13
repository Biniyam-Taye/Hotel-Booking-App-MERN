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
        <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24
         xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen relative group/hero overflow-hidden'>
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 w-full animate-fade-in-up">
                <p className='inline-block bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mt-20 text-sm md:text-base font-medium shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-default hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]'>
                    ✨ The Ultimate Hotel Experience
                </p>
                
                <h1 className='font-playfair text-4xl md:text-5xl lg:text-[72px] lg:leading-[80px] font-extrabold max-w-3xl mt-6 drop-shadow-2xl transition-all duration-700 hover:translate-x-2'>
                    Discover Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#49B9FF] to-cyan-300 drop-shadow-md">Getaway</span> Destination
                </h1>
                
                <p className='max-w-2xl mt-6 text-sm md:text-lg text-gray-100 font-light drop-shadow-lg leading-relaxed opacity-90 hover:opacity-100 transition-opacity duration-300'>
                    Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your unforgettable journey today.
                </p>
                
                <form onSubmit={onSearch} className='bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-2xl px-6 py-6 mt-12 flex flex-col lg:flex-row gap-6 w-full max-w-[1050px] transition-all duration-500 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.5)] hover:bg-white/15'>
                    
                    {/* Destination Input */}
                    <div className="flex-1 w-full group/input relative">
                        <div className='flex items-center gap-2 mb-2 text-sm font-medium text-gray-200 transition-colors group-hover/input:text-white'>
                            <img src={assets.locationIcon} alt="Location" className='h-4 group-hover/input:scale-125 group-hover/input:-translate-y-1 transition-transform duration-300' style={{ filter: 'brightness(0) invert(1)' }} />
                            <label htmlFor="destinationInput">Destination</label>
                        </div>
                        <div className="relative">
                            <input onChange={e => setDestination(e.target.value)} value={destination} list='destinations' id="destinationInput" type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 outline-none focus:bg-black/40 focus:border-[#49B9FF]/50 focus:ring-2 focus:ring-[#49B9FF]/30 transition-all duration-300 hover:bg-black/30" placeholder="Where are you going?" required />
                        </div>
                        <datalist id='destinations'>
                            {cities.map((city, index) => (
                                <option value={city} key={index} />
                            ))}
                        </datalist>
                    </div>

                    {/* Check In Input */}
                    <div className="flex-1 w-full group/input">
                        <div className='flex items-center gap-2 mb-2 text-sm font-medium text-gray-200 transition-colors group-hover/input:text-white'>
                            <img src={assets.calenderIcon} alt="Check In" className='h-4 group-hover/input:scale-125 group-hover/input:-translate-y-1 transition-transform duration-300' style={{ filter: 'brightness(0) invert(1)' }} />
                            <label htmlFor="checkIn">Check in</label>
                        </div>
                        <input id="checkIn" type="date" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:bg-black/40 focus:border-[#49B9FF]/50 focus:ring-2 focus:ring-[#49B9FF]/30 transition-all duration-300 hover:bg-black/30 [color-scheme:dark]" />
                    </div>

                    {/* Check Out Input */}
                    <div className="flex-1 w-full group/input">
                        <div className='flex items-center gap-2 mb-2 text-sm font-medium text-gray-200 transition-colors group-hover/input:text-white'>
                            <img src={assets.calenderIcon} alt="Check Out" className='h-4 group-hover/input:scale-125 group-hover/input:-translate-y-1 transition-transform duration-300' style={{ filter: 'brightness(0) invert(1)' }} />
                            <label htmlFor="checkOut">Check out</label>
                        </div>
                        <input id="checkOut" type="date" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:bg-black/40 focus:border-[#49B9FF]/50 focus:ring-2 focus:ring-[#49B9FF]/30 transition-all duration-300 hover:bg-black/30 [color-scheme:dark]" />
                    </div>

                    {/* Guests Input */}
                    <div className="w-full lg:w-32 group/input">
                        <div className='flex items-center gap-2 mb-2 text-sm font-medium text-gray-200 transition-colors group-hover/input:text-white'>
                            <img src={assets.guestsIcon} alt="Guests" className='h-4 group-hover/input:scale-125 group-hover/input:-translate-y-1 transition-transform duration-300' style={{ filter: 'brightness(0) invert(1)' }} />
                            <label htmlFor="guests">Guests</label>
                        </div>
                        <input min={1} max={4} id="guests" type="number" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 outline-none focus:bg-black/40 focus:border-[#49B9FF]/50 focus:ring-2 focus:ring-[#49B9FF]/30 transition-all duration-300 hover:bg-black/30" placeholder="0" />
                    </div>

                    {/* Search Button */}
                    <button className='flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#49B9FF] to-blue-600 py-3.5 px-8 text-white font-semibold mt-auto lg:mt-7 w-full lg:w-auto transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(73,185,255,0.6)] active:scale-95 group/btn border border-white/10'>
                        <img src={assets.searchIcon} alt="searchIcon" className='h-5 group-hover/btn:rotate-90 transition-transform duration-500' style={{ filter: 'brightness(0) invert(1)' }} />
                        <span className="tracking-wide">Search</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Hero