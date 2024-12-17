import React, { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import { HiOutlineHeart } from 'react-icons/hi2'
import { PiTruckLight } from "react-icons/pi"
import { HiMiniStar } from "react-icons/hi2"
import '../App.css';
import ProductList from '../components/product/ProductList'
import { addToCart } from '../services/apiService'

function ViewProduct() {
    const navigate = useNavigate();
    const { state } = useLocation();
    // const { productId } = useParams();
    const product = state?.product;
    
    const [quantity, setQuantity] = useState(0);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [maxQuantity, setMaxQuantity] = useState(0);
    const [price, setPrice] = useState(product?.variations?.[0]?.price || 0);

    const increaseQuantity = () => {
        if (quantity < maxQuantity) {
            setQuantity(prev => prev + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleVariationSelect = (variation) => {
        setSelectedVariation(variation);
        setQuantity(0);
        setMaxQuantity(variation.quantity);
    };

    if (!product) {
        return <p className="text-center">Product not found</p>;
    }
    
    const handleAddToCart = async () => {
        if (!selectedVariation) {
            toast.error("Please select a variation.");
            return;
        }
        if (quantity <= 0) {
            toast.error("Quantity must be greater than 0.");
            return;
        }

        try {
            const payload = {
                productID: product.productID,
                variationID: selectedVariation.variationID,
                quantity,
            };

            const response = await addToCart(payload);
            toast.success("Item added to cart!");

            navigate('/cart');
        } catch (error) {
            console.error("Error adding to cart:", error.message);
            toast.error("Failed to add item to cart.");
        }
    };
    const {productID, title, imageUrl, seller, description, category, variations} = product;

    return (
        <>
        <div className="flex flex-col min-h-screen w-screen">
            <NavBar />
            <main className="main-container flex flex-col p-4 md:p-8">
                {/* About Product */}
                <div className="flex flex-col gap-4 mt-2 mx-4 md:mx-8 lg:mx-16 xl:mx-20">
                    {/* Left and Right */}
                    <div className="flex flex-col md:flex-row md:space-x-2">
                        {/* Left */}
                        <div className="w-full md:w-[45%] mb-4 md:mb-0">
                            <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-[400px] object-cover rounded-lg"
                            />
                            {/* Content for Left Section */}
                        </div>
                        {/* Right */}
                        <div className="flex flex-col w-full md:w-[55%] p-3">
                            {/* 1 - About Seller */}
                            <div className="flex flex-row space-x-5 mb-3 text-[#979797] text-sm">
                                {/* Shop img & username */}
                                <div className="flex flex-row">
                                    <p>{seller.username}</p>
                                </div>
                                {/* Seller rating */}
                                <div className="flex flex-row items-center space-x-1.5">
                                    <HiMiniStar className="text-[#FFDE59] pb-1 text-xl" />
                                    <p>5.0</p>
                                </div>
                            </div>

                            {/* 2 - Product Name & Category */}
                            <div className="flex flex-col mb-5">
                                <h1 className="text-3xl font-medium">{title}</h1>
                                <p className="text-[#979797] text-sm">{category?.category || 'N/A'}</p>
                            </div>

                            {/* 3 - Price */}
                            <h1 className="text-3xl font-medium text-dowear-red mb-5">P{price}</h1>

                            {/* 4 - Variations */}
                            <div className="flex flex-col mb-5">
                                <p className="font-medium">Variations</p> {/* Variations here */}
                                <div className="flex flex-row mt-1 space-x-2">
                                    {variations?.map((variation) => (
                                        <button
                                            key={variation.variationID}
                                            className="text-[#656565] border border-[#D9D9D9] px-8 py-1 rounded-lg"
                                            onClick={() => handleVariationSelect(variation)}
                                        >
                                            {variation.name}
                                        </button>
                                    ))}
                                    {/* <button className="text-[#656565] border border-[#D9D9D9] px-8 py-1 rounded-lg">var1</button>
                                    <button className="text-[#656565] border border-[#D9D9D9] px-8 py-1 rounded-lg">var2</button> */}
                                </div>
                            </div>

                            {/* 5 - Quantity */}
                            <div className="flex flex-col mb-4">
                                <p className="font-medium mb-1">Quantity</p>
                                {/* Counter with Border */}
                                <div className="flex items-center justify-between border border-gray-300 rounded-lg w-fit px-2">
                                    <button 
                                        onClick={decreaseQuantity} 
                                        className="text-gray-700 px-1 py-1"
                                        disabled={quantity === 0} // Disable when quantity is 0
                                    >
                                        -
                                    </button>
                                    <span 
                                        className="text-lg font-medium text-center text-[#656565]"
                                        style={{ minWidth: '60px' }} // Ensures consistent width
                                    >
                                        {quantity}
                                    </span>
                                    <button 
                                        onClick={increaseQuantity} 
                                        className="text-gray-700 px-1 py-1"
                                        disabled={quantity >= maxQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <hr className="border-t border-gray-300 my-4 w-3/4" />

                            {/* 6 - Like and Shipping */}
                            <div className="flex flex-row items-center space-x-4 mb-4 text-[#979797] font-light">
                                <HiOutlineHeart className="text-xl" />
                                <p>|</p>
                                <div className="flex flex-row space-x-2">
                                    <PiTruckLight className="text-2xl" />
                                    <p>{seller.user_address}</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-row space-x-5">
                                <button 
                                    onClick={handleAddToCart}
                                    className={`border-2 border-dowear-red text-dowear-red font-medium py-2 px-5 rounded-md ${
                                        quantity === 0 ? ' cursor-not-allowed' : 'text-dowear-red'
                                    }`}
                                    disabled={quantity === 0}
                                >
                                    Add to Cart
                                </button>
                                <button 
                                    className={`font-medium py-2 px-6 rounded-md bg-dowear-red text-white ${
                                        quantity === 0 ? 'cursor-not-allowed' : ' text-white'
                                    }`}
                                    disabled={quantity === 0}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Bottom */}
                    <div className="p-4 flex flex-grow flex-col">
                        <h2 className="font-medium text-lg">Product Description</h2>
                        <p>{description}</p>
                    </div>
                    <hr className="border-t border-[#D3D3D3] w-[100%] mx-4" />
                </div>

                {/* Similar listings */}
                <div className="flex flex-col mx-2 md:mx-8 lg:mx-16 xl:mx-20 p-4 mt-2">
                    <h2 className="font-medium text-lg mb-2">You may also like</h2>
                    <div className="flex flex-row space-x-3">
                        <ProductList/>
                        <ProductList/>
                    </div>
                </div>

                {/* Recently Viewed */}
                <div className="flex flex-col mx-2 md:mx-8 lg:mx-16 xl:mx-20 p-4 mt-2">
                    <h2 className="font-medium text-lg mb-2">Recently viewed</h2>
                    <div className="flex flex-row space-x-3">
                        <ProductList/>
                        <ProductList/>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
        </>
    )
}

export default ViewProduct
