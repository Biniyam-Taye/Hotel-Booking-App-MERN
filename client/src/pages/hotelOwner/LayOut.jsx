import React from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import SideBar from '../../components/hotelOwner/SideBar'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
    return (
        <div className="flex flex-col h-screen">

            {/* Top Navbar */}
            <Navbar />

            {/* Sidebar + Page Content */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <SideBar />

                {/* Main Content */}
                <div className="flex-1 p-4 pt-10 md:px-10 overflow-y-auto">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default LayOut
