import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import ProductList from '../components/product/ProductList'
import { getUserProducts } from '../services/apiService'
import { useAuth } from '../context/AuthContext'
import { FaLocationDot } from "react-icons/fa6"
import { HiMiniStar } from "react-icons/hi2"

function ProfilePage(){
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [products, setProducts] = useState([]);
    const [activeSection, setActiveSection] = useState('listings');

    const fetchProducts = async () => {
        try {
            const data = await getUserProducts(token);
            console.log('Fetched products:', data);
            setProducts(data);
        } catch (err) {
            console.error('Error fetching user products:', err);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    const handleProductPosted = () => {
        fetchProducts();
    };

    return(
        <>
         <div className="flex flex-col min-h-screen w-screen">
            <NavBar/>
            <div className="relative mb-32">
                <div className="bg-[#F7F7F7] h-60"/>
                <div className="absolute flex items-center top-full left-32 transform -translate-y-1/3 z-10">
                        <div className="bg-[#D9D9D9] rounded-full h-48 w-48" />
                        <div className="ml-8 flex flex-col mt-10">
                            <h1 className="text-3xl font-medium">{user.username}</h1>
                            <div className="flex flex-row items-center mt-2">
                              <div className="flex flex-row space-x-2 mr-5">
                                <FaLocationDot className="text-[#D3D3D3] text-lg"/>
                                <p className="text-md text-[#C1C1C1]">{user.user_address || 'Not provided'}</p>
                              </div>
                              <div className="flex flex-row space-x-2">
                                <HiMiniStar className="text-[#FFDE59] text-lg"/>
                                <p className="text-md text-[#C1C1C1]">{user.user_rating !== null ? user.user_rating : 'No rating yet'}</p>
                              </div>
                                
                            </div>
                        </div>
                 </div>                
            </div>

            <div className="mt-9">
              <div className="relative flex justify-center space-x-80">
                  {/* listings text */}
                  <button
                      className={`text-xl font-semibold ${
                          activeSection === 'listings' ? 'text-black' : 'text-gray-500'
                      }`}
                      onClick={() => setActiveSection('listings')}
                  >
                      Listings
                  </button>
                  {/* ratings text */}
                  <button
                      className={`text-xl font-semibold ${
                          activeSection === 'ratings' ? 'text-black' : 'text-gray-500'
                      }`}
                      onClick={() => setActiveSection('ratings')}
                  >
                      Ratings
                  </button>
              </div>
              {/* active underline */}
              <div className="relative mt-2">
                  <div
                      className={`absolute h-[2.5px] bg-red-500 transition-all duration-300`}
                      style={{
                          width: activeSection === 'listings' ? '95px' : '83px',
                          left: activeSection === 'listings' ? 'calc(50% - 243px)' : 'calc(50% + 155px)',
                      }}
                  />
              </div>
              {/* horizontal line */}
              <div className="mt-2 border-t-2 border-gray-300 w-screen" />
              {/* conditionally render content */}
              <div className="mt-6 px-10 flex-grow mb-6">

                {activeSection === 'listings' ? (

                    products.length > 0 ? (
                        <div className="grid grid-cols-5 gap-x-6 gap-y-4 px-20">
                            {products.map((product) => (
                                <ProductList key={product.productID} product={product} onProductPosted={handleProductPosted} /> // product.id
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg">No Listings yet!</p>
                    ) 
                ) : (
                        <p className="text-center text-lg">No Ratings yet</p>
                )}
              </div>
            </div>
        <Footer/>
        </div>
        </>
    )
}

export default ProfilePage