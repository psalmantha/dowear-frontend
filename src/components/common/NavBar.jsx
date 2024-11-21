import React from 'react';
import DowearLogoNav from '../../assets/dowear-logo-nav.svg';
import { HiOutlineHeart, HiOutlineShoppingCart } from 'react-icons/hi2';
import { MdSearch } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';

function NavBar() {
    return (
        <div className="h-20 px-20 bg-dowear-red">
            <div className="flex items-center h-full max-w-screen-2xl mx-auto w-full">
                {/* Logo Section */}
                <div className="w-[14%] min-w-[100px] max-w-[130px] flex-shrink-0 hidden md:block">
                    <img 
                        src={DowearLogoNav} 
                        alt="DoWear Logo"
                        className="w-full h-auto"
                    />
                </div>

                {/* Search Section */}
                <div className="flex-grow ml-4 mr-10 md:mx-16">
                    <form className="relative w-full flex items-center">
                        <input 
                            type="search" 
                            placeholder="Search"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dowear-red-light focus:border-dowear-red text-sm md:text-base pr-10"
                        />
                        <MdSearch className="absolute right-3 text-gray-500 text-lg pointer-events-none" />
                    </form>
                </div>

                {/* Icons and Button Section */}
                <div className="flex items-center space-x-4 md:space-x-8">
                    <HiOutlineHeart className="text-white text-xl md:text-2xl" />
                    <HiOutlineShoppingCart className="text-white text-xl md:text-2xl" />
                    <BsPerson className="text-white text-xl md:text-2xl" />
                    <button className="text-sm md:text-base bg-[#FFDE59] font-semibold py-1 px-4 rounded-lg hover:bg-yellow-400 transition md:px-4">
                        <span className="md:hidden">+</span>
                        <span className="hidden md:block">+ Sell</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NavBar
