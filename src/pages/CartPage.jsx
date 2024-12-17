import React, { useEffect, useState } from 'react'
import { addToCart } from '../services/apiService'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'

function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const data = await addToCart();
            setCartItems(data);
        } catch (error) {
            console.error("Error fetching cart items:", error.message);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="p-6 flex-grow">
                <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
                <div className="flex flex-col space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center border rounded-lg p-4">
                            <img 
                                src={item.product.imageUrl} 
                                alt={item.product.title} 
                                className="w-20 h-20 object-cover rounded-md mr-4"
                            />
                            <div className="flex-grow">
                                <h2 className="text-lg font-medium">{item.product.title}</h2>
                                <p className="text-gray-500">Variation: {item.variation.name}</p>
                                <p className="text-gray-700 font-semibold">P{item.subtotal}</p>
                            </div>
                            <div className="text-gray-500 text-sm">
                                Quantity: {item.quantity}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default CartPage
