import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import DowearLogoNav from "../../assets/dowear-logo-nav.svg"
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2"
import { MdSearch } from "react-icons/md"
import { BsPerson } from "react-icons/bs"
import SellProduct from "../product/SellProduct"
import { useAuth } from '../../context/AuthContext'

function NavBar() {
    const [showSellProduct, setShowSellProduct] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSellButtonClick = () => {
        if(user){
            setShowSellProduct(true);
        }else{
            navigate("/login");
        }
    };

    const handleCloseSellProduct = () => {
        setShowSellProduct(false);
    };

    const handleToggleDropdown = () => {
        if(user){
            setShowDropdown(!showDropdown);
        }else{
            navigate("/login");
        }
    };

    const handleNavigate = (path) => {
        if(user){
            navigate(path);
        }else{
            navigate("/login");
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    

    return (
        <>
        <div className="h-20"/>
        <div className="h-20 px-4 md:px-20 bg-dowear-red fixed top-0 left-0 w-full z-50">
            <div className="flex items-center h-full w-full max-w-7xl mx-auto">
                {/* Logo */}
                <div className="w-[14%] min-w-[100px] max-w-[130px] flex-shrink-0 hidden md:block">
                    <Link to="/">
                        <img
                            src={DowearLogoNav}
                                alt="DoWear Logo"
                                className="w-full h-auto"
                            />
                    </Link>
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
                    <HiOutlineHeart className="text-white text-xl md:text-2xl"/>
                    <HiOutlineShoppingCart className="text-white text-xl md:text-2xl"/>
                    {/* Profile Button Dropdown */}
                    <div className="relative">
                        <BsPerson
                            className="text-white text-xl md:text-2xl cursor-pointer"
                            onClick={handleToggleDropdown}
                        />
                        {showDropdown && (
                            <div className="absolute top-10 -right-9 bg-white border border-gray-300 shadow-lg rounded-md w-44 text-md">
                                {/* Arrow */}
                                <div className="absolute -top-2 right-10 w-4 h-4 bg-white border-l border-t border-gray-300 rotate-45"/>
                                    {/* Dropdown Content */}
                                    <ul className="py-1 font-medium">
                                        <li 
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                                            onClick={() => handleNavigate('/profile')}
                                        >
                                            Profile
                                        </li>
                                        <li 
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                                            onClick={() => handleNavigate('/profile')} // will change to listings page
                                        >
                                            Manage Listings
                                        </li>
                                        <li 
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleNavigate('/profile')} // will change to settings page
                                        >
                                            Settings
                                        </li>
                                        <li 
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            Log Out
                                        </li>
                                    </ul>
                                </div>
                        )}
                    </div>
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