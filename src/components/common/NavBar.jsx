import React, {useState} from 'react'
import DowearLogoNav from '../../assets/dowear-logo-nav.svg'
import { HiOutlineHeart, HiOutlineShoppingCart } from 'react-icons/hi2'
import { MdSearch } from 'react-icons/md'
import { BsPerson } from 'react-icons/bs'
import SellProduct from '../product/SellProduct'

function NavBar() {
    const [showSellProduct, setShowSellProduct] = useState(false);

    const handleSellButtonClick = () => {
        setShowSellProduct(true);
    }

    const handleCloseSellProduct = () => {
        setShowSellProduct(false);
    }

    return (
        <>
        <div className="h-20 px-4 md:px-20 bg-dowear-red fixed top-0 left-0 w-full z-50">
            <div className="flex items-center h-full w-full max-w-7xl mx-auto">
                {/* Logo */}
                <div className="w-[14%] min-w-[100px] max-w-[130px] flex-shrink-0 hidden md:block">
                    <img 
                        src={DowearLogoNav} 
                        alt="DoWear Logo"
                        className="w-full h-auto"
                    />
                </div>
                {/* Search Bar */}
                <div className="flex-grow mr-5 md:mx-16">
                    <form className="relative w-full flex items-center">
                        <input 
                            type="search" 
                            placeholder="Search"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dowear-red-light focus:border-dowear-red text-sm md:text-base pr-10"
                        />
                        <MdSearch className="absolute right-3 text-gray-500 text-lg pointer-events-none"/>
                    </form>
                </div>
                {/* Likes, Cart, Profile, and Sell Buttons */}
                <div className="flex items-center space-x-4 md:space-x-8">
                    <HiOutlineHeart className="text-white text-xl md:text-2xl" />
                    <HiOutlineShoppingCart className="text-white text-xl md:text-2xl"/>
                    <BsPerson className="text-white text-xl md:text-2xl"/>
                    <button 
                        className="text-sm md:text-base bg-[#FFDE59] font-semibold py-1.5 px-4 rounded-2xl hover:bg-yellow-400 transition md:px-5"
                        onClick={handleSellButtonClick}
                    >
                        <span className="md:hidden">+</span>
                        <span className="hidden md:block">+ Sell</span>
                    </button>
                </div>
            </div>
        </div>
        {showSellProduct && <SellProduct onClose={handleCloseSellProduct}/>}
        </>
    )
}

export default NavBar