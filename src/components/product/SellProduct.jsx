import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../context/AuthContext'
import { createProduct } from '../../services/apiService'
import { PiDressLight, PiShirtFoldedLight, PiFlowerLotusLight } from "react-icons/pi"
import { GiDiamondRing, GiSmartphone } from "react-icons/gi"
import { LiaHomeSolid } from "react-icons/lia"
import "../../App.css"

function SellProduct({ onClose }){
    const navigate = useNavigate();
    const { token } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [variations, setVariations] = useState([{ variation: "", quantity: "", price: "" }]);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [image, setImage] = useState(null);

    const goToNextPage = () => {
        console.log('Selected Category:', selectedCategory);
        setCurrentPage((prev) => prev + 1);
    }
    const goToPreviousPage = () => setCurrentPage((prev) => prev - 1);

    const categories = [
        { id: 1, icon: <PiDressLight className="text-4xl" />, label: "Women's Fashion" },
        { id: 2, icon: <PiShirtFoldedLight className="text-4xl" />, label: "Men's Fashion" },
        { id: 3, icon: <PiFlowerLotusLight className="text-4xl" />, label: "Beauty & Personal Care" },
        { id: 4, icon: <GiDiamondRing className="text-4xl" />, label: "Jewelry & Accessories" },
        { id: 5, icon: <LiaHomeSolid className="text-4xl" />, label: "Home & Furniture" },
        { id: 6, icon: <GiSmartphone className="text-4xl" />, label: "Gadgets & Electronics" },
    ];

    const handleCategoryClick = (id) => {
        setSelectedCategory(id);
    };

    const handleVariationChange = (index, field, value) => {
        const updated = [...variations];
        if (field === "quantity" || field === "price") {
          const parsedValue = field === "quantity" ? parseInt(value, 10) : parseFloat(value);
          updated[index][field] = !isNaN(parsedValue) && parsedValue > 0 ? value : "";
        } else {
          updated[index][field] = value;
        }
        setVariations(updated);
    };
    

    const addVariation = () => {
        setVariations([...variations, { variation: "", quantity: "", price: "" }]);
    }

    const removeVariation = (index) => {
        if(variations.length > 1){
            const newVariations = variations.filter((_, i) => i !== index);
            setVariations(newVariations);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const validTypes = ["image/jpeg", "image/png", "image/jpg"];
          const maxFileSize = 2 * 1024 * 1024; // 2MB
          if (!validTypes.includes(file.type)) return alert("Please upload a valid image (JPG, PNG).");
          if (file.size > maxFileSize) return alert("File size exceeds 2MB.");
          setImage(file);
        }
    };
      
    const handlePostProduct = async (formData) => {
        try {
            const response = await createProduct(formData, token);
            console.log('Product successfully posted:', response);
            
            onClose();
            navigate('/profile');
        } catch (error) {
            console.error('Error posting product:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const hasEmptyFields = 
          !selectedCategory || 
          !productName.trim() || 
          !description.trim() || 
          variations.some((v) => !v.variation.trim() || !v.quantity || !v.price) ||
          !tags.trim() || !image;

        if (hasEmptyFields) {
          setShowErrors(true);
          return;
        }
    
        try {
          const productData = {
            categoryID: selectedCategory,
            title: productName.trim(),
            description: description.trim(),
            tags: tags.split(/\s+/).filter(Boolean),
            variations,
          };
    
        //   console.log('Product Data:', productData);

          const formData = new FormData();
          formData.append("productData", JSON.stringify(productData));
          if (image) formData.append("image", image);
          await handlePostProduct(formData);
        //   const response = await createProduct(formData, token);
        //   console.log("Product created:", response);
          
        
        //   onClose();
        //   navigate('/profile');
        } catch (error) {
          console.error("Failed to list product:", error); 
        }
    };
    

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-30 z-50 flex items-center justify-center">
            <div className="bg-white border-2 border-dowear-red w-[90%] md:w-[60%] max-w-[1000px] p-5 rounded-md relative overflow-hidden">
                <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                onClick={onClose}
                >
                    &times;
                </button>

                <h2 className="text-2xl font-semibold text-center mb-4">Sell Product</h2>

                {currentPage === 1 && (
                <div className="page-1">
                    <h3 className="text-lg font-semibold mb-2 text-left">
                        Select a Category
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`flex flex-col items-center justify-center h-24 rounded-xl border ${
                                    selectedCategory === category.id
                                    ? "bg-[#dedede]"
                                    : "bg-[#f3f3f3] hover:bg-[#dedede]"
                                }`}
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                {category.icon}
                                <span className="text-sm font-medium mt-2">
                                    {category.label}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            className="bg-dowear-red text-white font-medium px-5 py-2 rounded-lg hover:bg-red-600 transition"
                            onClick={goToNextPage}
                            disabled={!selectedCategory}
                        >
                            Next
                        </button>
                    </div>
                </div>
                )}

                {currentPage === 2 && (
                <div className="page-2 overflow-y-auto max-h-[500px] pr-4">
                    <form onSubmit={handlePostProduct}>
                        <label className="block mb-3">
                            Category
                            <input
                                type="text"
                                value={selectedCategory || ""}
                                readOnly
                                className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                            />
                        </label>

                        <label className="block mb-3">
                            Product Name
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className={`font-regular w-full px-3 py-2 border rounded-md ${
                                    showErrors && !productName.trim() ? "border-red-500" : ""
                                }`}
                                placeholder="Enter product name"
                            />
                        </label>

                        <label className="block mb-1">
                            Description
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md ${
                                    showErrors && !description.trim() ? "border-red-500" : ""
                                }`}
                                placeholder="Enter product description"
                            />
                        </label>

                        <label className="block mb-3">
                            Tags
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className={`font-regular w-full px-3 py-2 border rounded-md ${
                                    showErrors && !tags.trim() ? "border-red-500" : ""
                                }`}
                                placeholder="Enter tags (separated by space)"
                            />
                        </label>


                        {/* img upload */}
                        <label className="block mb-3">
                            Product Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </label>

                        <div
                            className="grid gap-3 mb-2 items-center"
                            style={{
                            gridTemplateColumns: "50% 20% 20% 5%",
                            width: "100%",
                            margin: "0 auto",
                            }}
                        >
                            <span className="text-left">Variation</span>
                            <span className="text-left">Quantity</span>
                            <span className="text-left">Price</span>
                        </div>

                        {variations.map((variation, index) => (
                            <div
                                key={index}
                                className="grid gap-3 items-center"
                                style={{
                                    gridTemplateColumns: "50% 20% 20% 5%",
                                    width: "100%",
                                    margin: "0 auto",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                <input
                                    type="text"
                                    value={variation.variation}
                                    onChange={(e) =>
                                    handleVariationChange(index, "variation", e.target.value)
                                    }
                                    placeholder="Variation"
                                    className={`w-full px-3 py-2 border rounded-md ${
                                    showErrors && !variation.variation.trim()
                                        ? "border-red-500"
                                        : ""
                                    }`}
                                />
                                <input
                                    type="number"
                                    value={variation.quantity}
                                    onChange={(e) =>
                                    handleVariationChange(index, "quantity", e.target.value)
                                    }
                                    placeholder="Quantity"
                                    className={`w-full px-3 py-2 border rounded-md ${
                                    showErrors &&
                                    (!variation.quantity || variation.quantity <= 0)
                                        ? "border-red-500"
                                        : ""
                                    }`}
                                />
                                <input
                                    type="number"
                                    value={variation.price}
                                    onChange={(e) =>
                                    handleVariationChange(index, "price", e.target.value)
                                    }
                                    placeholder="Price"
                                    className={`w-full px-3 py-2 border rounded-md ${
                                    showErrors && (!variation.price || variation.price <= 0)
                                        ? "border-red-500"
                                        : ""
                                    }`}
                                />
                                <div className="flex justify-center items-center">
                                    <button
                                        type="button"
                                        onClick={addVariation}
                                        className="text-green-500"
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeVariation(index)}
                                        className={`text-red-500 ml-2 ${
                                            variations.length === 1 ? "hidden" : ""
                                        }`}
                                    >
                                        &ndash;
                                    </button>
                                </div>
                            </div>
                        ))}
                    </form>
                    <div className="flex justify-between mt-4">
                        <button
                            className="bg-gray-200 text-black font-medium px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                            onClick={goToPreviousPage}
                        >
                            Back
                        </button>
                        <button
                            className="bg-dowear-red text-white font-medium px-5 py-2 rounded-lg hover:bg-red-600 transition"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default SellProduct
