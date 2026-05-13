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
         xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen relative overflow-hidden'>
            {/* Gradient overlay for text readability while keeping the image vibrant on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 w-full animate-fade-in-up mt-10">
                <div className='inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20 transition-all cursor-default mb-6 shadow-sm'>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#49B9FF] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#49B9FF]"></span>
                    </span>
                    The Ultimate Hotel Experience
                </div>
                
                <h1 className='font-playfair text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl drop-shadow-xl leading-tight'>
                    Discover Your Perfect <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#49B9FF] to-blue-200">Getaway</span> Destination
                </h1>
                
                <p className='max-w-xl mt-6 text-base md:text-lg text-gray-200 font-light drop-shadow-md leading-relaxed'>
                    Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your unforgettable journey today.
                </p>
                
                {/* Premium Widget Search Bar */}
                <form onSubmit={onSearch} className='bg-white/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-[2rem] p-3 mt-12 flex flex-col md:flex-row items-stretch gap-3 w-full max-w-[1050px] transition-transform hover:-translate-y-1 duration-500 relative z-20 border border-white/50'>
                    
                    {/* Destination */}
                    <div className='flex-1 w-full bg-gray-50/80 hover:bg-blue-50/50 border border-transparent hover:border-blue-200 rounded-[1.5rem] px-5 py-4 transition-all duration-300 group cursor-text focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 shadow-inner'>
                        <div className='flex items-center gap-2 mb-1.5'>
                            <img src={assets.locationIcon} alt="Location" className='w-4 h-4 opacity-50 group-focus-within:opacity-100 group-focus-within:scale-110 transition-all' />
                            <label htmlFor="destinationInput" className='text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-text'>Destination</label>
                        </div>
                        <div className="relative">
                            <input onChange={e => setDestination(e.target.value)} value={destination} list='destinations' id="destinationInput" type="text" className="w-full text-base md:text-lg font-bold text-gray-900 placeholder-gray-400 outline-none bg-transparent truncate" placeholder="Where are you going?" required />
                            <datalist id='destinations'>
                                {cities.map((city, index) => (
                                    <option value={city} key={index} />
                                ))}
                            </datalist>
                        </div>
                    </div>

                    {/* Check In */}
                    <div className='flex-1 w-full bg-gray-50/80 hover:bg-blue-50/50 border border-transparent hover:border-blue-200 rounded-[1.5rem] px-5 py-4 transition-all duration-300 group cursor-text focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 shadow-inner'>
                        <div className='flex items-center gap-2 mb-1.5'>
                            <img src={assets.calenderIcon} alt="Check In" className='w-4 h-4 opacity-50 group-focus-within:opacity-100 group-focus-within:scale-110 transition-all' />
                            <label htmlFor="checkIn" className='text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-text'>Check in</label>
                        </div>
                        <input id="checkIn" type="date" className="w-full text-base md:text-lg font-bold text-gray-900 outline-none bg-transparent [color-scheme:light] cursor-text" />
                    </div>

                    {/* Check Out */}
                    <div className='flex-1 w-full bg-gray-50/80 hover:bg-blue-50/50 border border-transparent hover:border-blue-200 rounded-[1.5rem] px-5 py-4 transition-all duration-300 group cursor-text focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 shadow-inner'>
                        <div className='flex items-center gap-2 mb-1.5'>
                            <img src={assets.calenderIcon} alt="Check Out" className='w-4 h-4 opacity-50 group-focus-within:opacity-100 group-focus-within:scale-110 transition-all' />
                            <label htmlFor="checkOut" className='text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-text'>Check out</label>
                        </div>
                        <input id="checkOut" type="date" className="w-full text-base md:text-lg font-bold text-gray-900 outline-none bg-transparent [color-scheme:light] cursor-text" />
                    </div>

                    {/* Guests & Button Container */}
                    <div className='flex items-stretch w-full md:w-auto gap-3'>
                        <div className='flex-1 md:w-36 bg-gray-50/80 hover:bg-blue-50/50 border border-transparent hover:border-blue-200 rounded-[1.5rem] px-5 py-4 transition-all duration-300 group cursor-text focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 shadow-inner'>
                            <div className='flex items-center gap-2 mb-1.5'>
                                <img src={assets.guestsIcon} alt="Guests" className='w-4 h-4 opacity-50 group-focus-within:opacity-100 group-focus-within:scale-110 transition-all' />
                                <label htmlFor="guests" className='text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-text'>Guests</label>
                            </div>
                            <input min={1} max={4} id="guests" type="number" className="w-full text-base md:text-lg font-bold text-gray-900 placeholder-gray-400 outline-none bg-transparent" placeholder="0" />
                        </div>
                        
                        <button className='bg-gradient-to-br from-[#49B9FF] to-blue-600 hover:to-blue-700 w-full md:w-20 rounded-[1.5rem] shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center flex-shrink-0 group/btn h-full py-4 md:py-0'>
                            <img src={assets.searchIcon} alt="Search" className='w-6 h-6 group-hover/btn:scale-125 transition-transform duration-500' style={{ filter: 'brightness(0) invert(1)' }} />
                            <span className="md:hidden ml-2 font-bold text-white tracking-wide">Search</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Hero