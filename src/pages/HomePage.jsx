import React, { useEffect, useState } from 'react';
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import Categories from '../components/product/Categories'
import HomeBanner from '../components/common/HomeBanner'
import ProductList from '../components/product/ProductList'
import { getUserProducts } from '../services/apiService'
import { useAuth } from '../context/AuthContext'
import { MdKeyboardArrowRight } from "react-icons/md"
import '../App.css'

function HomePage(){
    const { token } = useAuth();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const allProducts = await getUserProducts(token);

            const featured = allProducts.slice(0, 6);
            const recent = allProducts.slice(-6);

            setFeaturedProducts(featured);
            setNewProducts(recent);
        } catch (error) {
            console.error('Error fetching products:', error);
            setFeaturedProducts([]);
            setNewProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    return (
        <>
        <div className="flex flex-col min-h-screen w-screen">
            <NavBar />
            <HomeBanner className="mt-20" />
            <main className="main-container">
                {/* Categories Section */}
                <div className="mt-12">
                    <h2 className="font-semibold text-center text-xl">Shop by Category</h2>
                    <div className="categories">
                        <Categories/>
                    </div>
                </div>

                {/* Featured Products Section */}
                <div className="mt-16">
                    <div className="flex flex-row items-center space-x-3">
                        <h2 className="font-semibold text-left text-xl">Featured Products</h2>
                        <MdKeyboardArrowRight />
                    </div>
                    {/* Horizontal scrolling carousel */}
                    <div className="product-carousel">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map((product) => (
                                <ProductList key={product.productID} product={product}/>
                            ))
                        ) : (
                            <p>No Featured Products</p>
                        )}
                    </div>
                </div>

                {/* New Products Section */}
                <div className="mt-10 mb-10">
                    <div className="flex flex-row items-center space-x-2">
                        <h2 className="font-semibold text-left text-xl">New Products</h2>
                        <MdKeyboardArrowRight />
                    </div>
                    {/* Horizontal scrolling carousel */}
                    <div className="product-carousel">
                        {newProducts.length > 0 ? (
                            newProducts.map((product) => (
                                <ProductList key={product.productID} product={product} />
                            ))
                        ) : (
                            <p>No New Products</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
        </>
    )
}

export default HomePage
