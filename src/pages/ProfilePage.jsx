import React from 'react'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import { useAuth } from '../context/AuthContext'
import { FaLocationDot } from "react-icons/fa6"

function ProfilePage(){
    const { user } = useAuth();

    if (!user) {
        return <p>Loading...</p>;
    } 

    return(
        <>
         <div className="flex flex-col min-h-screen w-screen">
            <NavBar/>
            <div className="relative mb-52"> {/* will fix mb */}
                <div className="bg-[#F7F7F7] h-60"/>
                <div className="absolute flex items-center top-full left-32 transform -translate-y-1/3 z-10">
                        <div className="bg-[#D9D9D9] rounded-full h-48 w-48" />
                        <div className="ml-8 flex flex-col mt-10">
                            <h1 className="text-3xl font-medium">{user.username}</h1>
                            <div className="flex flex-row items-center mt-2">
                                <FaLocationDot className="text-[#D3D3D3] text-lg"/>
                                <h1 className="text-md font-medium">{user.address}</h1>

                            </div>
                        </div>
                 </div>                

            </div>
            <Footer/>
        </div>
        </>
    )
}

export default ProfilePage