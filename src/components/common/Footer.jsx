import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../App.css";

function Footer() {
    return (
        <>
            <div className="h-54 w-screen bg-dowear-red">
                <div className="flex flex-wrap lg:flex-nowrap lg:space-x-8 justify-center text-white my-10 mx-20">
                    {/* dowear E-commerce */}
                    <div className="flex flex-col w-full sm:w-[22%] mb-6 sm:mb-0 pr-12 mr-2">
                        <h2 className="font-bold mb-2 text-lg">dowear E-commerce</h2>
                        <p className="font-light text-left leading-normal text-sm">
                            DoWear is a buy-and-sell app that lets users easily shop, sell, and manage orders in one simple, secure platform. Discover products, track purchases, and enjoy a seamless buying and selling experience.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col w-full sm:w-[16%] mb-6 sm:mb-0 pr-12 mr-2">
                        <h2 className="font-bold mb-1.5 text-lg">Quick Links</h2>
                        <ul className="footer-list font-light text-sm">
                            <li className="list-item"><Link to="/">Home</Link></li>
                            <li className="list-item"><Link to="#">Profile</Link></li>
                            <li className="list-item"><Link to="#">Browse Products</Link></li>
                            <li className="list-item"><Link to="#">Manage Listings</Link></li>
                            <li className="list-item"><Link to="#">Settings</Link></li>
                        </ul>
                    </div>

                    {/* Shop Now */}
                    <div className="flex flex-col w-full sm:w-[18%] mb-6 sm:mb-0 pr-12 mr-2">
                        <h2 className="font-bold mb-1.5 text-lg">Shop Now</h2>
                        <ul className="footer-list font-light text-sm">
                            <li className="list-item"><Link to="#">Women's Fashion</Link></li>
                            <li className="list-item"><Link to="#">Men's Fashion</Link></li>
                            <li className="list-item"><Link to="#">Beauty & Personal Care</Link></li>
                            <li className="list-item"><Link to="#">Jewelry & Accessories</Link></li>
                            <li className="list-item"><Link to="#">Home & Furniture</Link></li>
                            <li className="list-item"><Link to="#">Gadgets & Electronics</Link></li>
                        </ul>
                    </div>

                    {/* Reach Us */}
                    <div className="flex flex-col w-full sm:w-[20%] mb-6 sm:mb-0">
                        <h2 className="font-bold mb-1.5 text-lg">Reach Us</h2>
                        <div>
                            <div className="flex flex-row mb-3 items-start">
                                <FaLocationDot className="text-white icon-fixed-size mr-2 flex-start mt-1" />
                                <p className="font-light text-sm leading-normal">
                                    #444 Gov. M. Cuenco Avenue, Barangay Talamban, Cebu City 6000 Cebu.
                                </p>
                            </div>
                            <div className="flex flex-row items-center mb-3">
                                <FaPhoneFlip className="text-white icon-fixed-size mr-2" />
                                <p className="font-light text-sm">+63 944 318 7890</p>
                            </div>
                            <div className="flex flex-row items-center">
                                <MdEmail className="text-white icon-fixed-size mr-2" />
                                <p className="font-light text-sm">contactdowear@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#C9133D] h-8 flex items-center">
                <p className="ml-4 text-xs text-white">© 2024 dowear. All Rights Reserved.</p>
            </div>
        </>
    );
}

export default Footer;
