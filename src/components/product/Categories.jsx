import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductsByCategory } from '../../services/apiService'
import { PiDressLight } from "react-icons/pi"
import { PiShirtFoldedLight } from "react-icons/pi"
import { PiFlowerLotusLight } from "react-icons/pi"
import { GiDiamondRing } from "react-icons/gi"
import { LiaHomeSolid } from "react-icons/lia"
import { GiSmartphone } from "react-icons/gi"
import '../../App.css'

function Categories() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const handleCategoryClick = async (categoryID, categoryName) => {
        try {
            const response = await getProductsByCategory(categoryID);
            const products = response.data;
    
            navigate("/page", { state: { categoryID, categoryName, products } });
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to fetch products. Please try again.");
        }
    };
    

    return (
        <div className="flex flex-col items-center mt-5 w-full max-w-6xl mx-auto px-4">
            {/* Row 1 */}
            <div className="flex justify-between w-full mb-8 space-x-12">
                <div className="category flex items-center space-x-2" onClick={() => handleCategoryClick(1, "Women's fashion")}>
                    <PiDressLight className="text-3xl" />
                    <p>Women's fashion</p>
                </div>
                <div className="category flex items-center space-x-2" onClick={() => handleCategoryClick(2, "Men's fashion")}>
                    <PiShirtFoldedLight className="text-3xl" />
                    <p>Men's fashion</p>
                </div>
                <div className="category flex items-center space-x-2" onClick={() => handleCategoryClick(3, "Beauty & Personal Care")}>
                    <PiFlowerLotusLight className="text-3xl" />
                    <p>Beauty & Personal Care</p>
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between w-full space-x-12">
                <div className="category flex items-center space-x-2" onClick={() => handleCategoryClick(4, "Jewelry & Accessories")}>
                    <GiDiamondRing className="text-2xl" />
                    <p>Jewelry & Accessories</p>
                </div>
                <div className="category flex items-center space-x-2" onClick={() => handleCategoryClick(5, "Home & Furniture")}>
                    <LiaHomeSolid className="text-2xl" />
                    <p>Home & Furniture</p>
                </div>
                <div className="category flex items-center space-x-2" onClick={() => handleCategoryClick(6, "Gadgets & Electronics")}>
                    <GiSmartphone className="text-2xl" />
                    <p>Gadgets & Electronics</p>
                </div>
            </div>
        </div>
    )
}

export default Categories
