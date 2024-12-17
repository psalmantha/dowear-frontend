import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../services/apiService'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'

function CheckoutPage({ cartItems }) {
    const navigate = useNavigate();

    const [recipientName, setRecipientName] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const shippingFee = 50.0; // static
    const subtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    const totalAmount = subtotal + shippingFee;

    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        const orderData = {
            recipient_name: recipientName,
            shipping_address: shippingAddress,
            contact_number: contactNumber,
            payment_method: paymentMethod,
            shipping_fee: shippingFee,
            total_amount: totalAmount,
            items: cartItems.map((item) => ({
                productID: item.product.productID,
                quantity: item.quantity,
                subtotal: item.subtotal,
            })),
        };

        try {
            const response = await createOrder(orderData);
            console.log('Order Created:', response);
            alert('Order successfully placed!');
            navigate('/order-success');
        } catch (error) {
            console.error('Error submitting order:', error.message);
            alert('Failed to place the order. Please try again.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="p-6 flex-grow">
                <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

                {/* checkout form */}
                <form onSubmit={handleSubmitOrder} className="space-y-6">
                    {/* buyer details */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Recipient Name</label>
                        <input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="w-full border rounded p-2"
                            placeholder="Enter recipient name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Shipping Address</label>
                        <input
                            type="text"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            className="w-full border rounded p-2"
                            placeholder="Enter shipping address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            className="w-full border rounded p-2"
                            placeholder="+01234567890"
                            required
                        />
                    </div>

                    {/* payment method */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border rounded p-2"
                        >
                            <option value="cod">Cash on Delivery</option>
                            <option value="gcash">Gcash</option>
                            <option value="maya">Maya</option>
                        </select>
                    </div>

                    {/* cart items summary */}
                    <div className="border-t pt-4">
                        <h2 className="text-xl font-medium mb-3">Order Summary</h2>
                        {cartItems.map((item) => (
                            <div key={item.product.productID} className="flex justify-between mb-2">
                                <span>{item.product.title} (x{item.quantity})</span>
                                <span>P{item.subtotal.toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-semibold mt-2">
                            <span>Shipping Fee:</span>
                            <span>P{shippingFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold mt-2 text-lg">
                            <span>Total:</span>
                            <span>P{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* submit button */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                        Place Order
                    </button>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default CheckoutPage
