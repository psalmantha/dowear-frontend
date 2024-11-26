import React from 'react'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import Categories from '../components/product/Categories'
import HomeBanner from '../components/common/HomeBanner'
import ProductList from '../components/product/ProductList'
import { MdKeyboardArrowRight } from "react-icons/md"

import '../App.css'

function HomePage() {
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
                        {/* Will dynamically handle data here after connecting to backend */}
                        <ProductList/>
                        <ProductList/>
                        <ProductList/>
                        <ProductList/>
                        <ProductList/>
                        <ProductList/>
                        <ProductList/>
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
                        {/* Will dynamically handle data here after connecting to backend */}
                        <ProductList/>
                        <ProductList/>
                        <ProductList/>
                        <ProductList/>
                        <ProductList/>
                        <ProductList/>
                        <ProductList/>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
        </>
    )
}

export default HomePage
