import { HiOutlineHeart } from 'react-icons/hi2'
import { FaLocationDot } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'

function ProductList({ product }){
    const navigate = useNavigate();

    if (!product) {
        return <p>No product data available</p>;
    }

    const {productID, title, imageUrl, seller} = product;
    
    const handleCardClick = () => {
        navigate(`/product/${productID}`, { state: { product } });
    };

    return(
        <>
        <div 
            className="flex flex-col bg-[#F8F8F8] h-[350px] rounded-xl py-4 px-4"
            onClick={handleCardClick}    
        >
            <div className="flex flex-row">
                <p className="text-xs ml-1 mb-2">{seller?.username}</p> 
            </div>
            <div className="flex items-center justify-center bg-[#F0F0F0] h-[60%] w-[100%] mx-auto rounded-lg">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col mt-2">
                <div className="flex flex-row items-center space-x-14">
                    <h1 className="font-regular text-md w-[80%]">{title}</h1>
                    <HiOutlineHeart className="text-xl w-[20%]"/>
                </div>
                {/* <h2 className="text-dowear-red text-sm">{product.price}</h2> */}
                <div className="flex flex-row items-center space-x-1 text-sm text-[#979797] mt-5">
                    <FaLocationDot className="text-[#D3D3D3]"/>
                    <p className="text-[#D3D3D3] font-light">{seller?.user_address}</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductList