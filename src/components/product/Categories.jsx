import { PiDressLight } from "react-icons/pi"
import { PiShirtFoldedLight } from "react-icons/pi"
import { PiFlowerLotusLight } from "react-icons/pi"
import { GiDiamondRing } from "react-icons/gi"
import { LiaHomeSolid } from "react-icons/lia"
import { GiSmartphone } from "react-icons/gi"
import '../../App.css'

function Categories() {
    return (
        <div className="flex flex-col items-center mt-5 w-full max-w-6xl mx-auto px-4">
            {/* Row 1 */}
            <div className="flex justify-between w-full mb-8 space-x-12">
                <div className="category flex items-center space-x-2">
                    <PiDressLight className="text-3xl" />
                    <p>Women's fashion</p>
                </div>
                <div className="category flex items-center space-x-2">
                    <PiShirtFoldedLight className="text-3xl" />
                    <p>Men's fashion</p>
                </div>
                <div className="category flex items-center space-x-2">
                    <PiFlowerLotusLight className="text-3xl" />
                    <p>Beauty & Personal Care</p>
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between w-full space-x-12">
                <div className="category flex items-center space-x-2">
                    <GiDiamondRing className="text-2xl" />
                    <p>Jewelry & Accessories</p>
                </div>
                <div className="category flex items-center space-x-2">
                    <LiaHomeSolid className="text-2xl" />
                    <p>Home & Furniture</p>
                </div>
                <div className="category flex items-center space-x-2">
                    <GiSmartphone className="text-2xl" />
                    <p>Gadgets & Electronics</p>
                </div>
            </div>
        </div>
    )
}

export default Categories
