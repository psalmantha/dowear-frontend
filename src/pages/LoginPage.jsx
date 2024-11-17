import React from 'react'
import { Link } from 'react-router-dom'
import LoginImg from '../assets/login-img.svg'
import DowearLogo from '../assets/dowear-logo.svg'

function LoginPage(){
    return(
        <>
        <div className="flex h-screen w-screen flex-col md:flex-row">
            {/* Left Section */}
            <div className="flex items-center justify-end w-full md:w-[50%]">
                <img 
                    src={LoginImg} 
                    alt="Log in Promotional Graphic" 
                    className="hidden md:block w-[70%] h-auto max-h-[85%] object-contain"
                />
            </div>
            {/* Right Section */}
            <div className="flex flex-col items-center justify-center w-full h-screen md:h-auto md:w-[40%] md:pr-8"> 
                <img 
                    src={DowearLogo} 
                    alt="Dowear Logo" 
                    className="h-16 mb-4"
                />
                <h1 className="text-[40px] md:text-[42px] font-bold mb-[1px] tracking-tight text-center md:text-center">
                    Welcome back!
                </h1>
                <p className="text-sm text-[#979797] mb-8 tracking-tight text-center md:text-left">
                        Please log in to your account.
                </p>
                <form className="w-[65%] max-w-md">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="w-full p-5 mb-6 border border-[#D3D3D3] bg-[#F3F4F8] rounded-[14px] text-sm focus:outline-none"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-5 mb-4 border border-[#D3D3D3] bg-[#F3F4F8] rounded-[14px] text-sm focus:outline-none"
                    />
                    <div className="flex justify-end mb-6">
                        <Link 
                            to="/" 
                            className="text-[#898989] tracking-tight text-sm hover:underline">
                                Forgot Password?
                        </Link>
                    </div>
                    <button type="submit" className="w-full bg-dowear-red text-white text-sm p-4 mt-3 rounded-[14px] font-bold hover:bg-red-600 transition">
                        Log in
                    </button>
                </form>
                <p className="text-[#898989] text-sm mt-3 mb-2 tracking-tight text-center md:text-left">
                    Don't have an account? {" "}
                    <Link to="/" 
                        className="text-[#6483FF] font-light hover:underline">
                            Sign up
                    </Link>
                </p>
                
            </div>
        </div>
        </>
    )
}

export default LoginPage