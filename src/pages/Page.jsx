import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import NavBar from "../components/common/NavBar"
import Footer from "../components/common/Footer"
import ProductList from "../components/product/ProductList"
import { getProductsByCategory } from "../services/apiService"

function Page() {
    const location = useLocation();
    const navigate = useNavigate();
    const { categoryID, categoryName } = location.state || {};
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!categoryID) {
            navigate("/");
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await getProductsByCategory(categoryID);
                setProducts(response.data || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryID, navigate]);

    return (
        <div className="flex flex-col min-h-screen w-screen">
            <NavBar />
            <main className="flex flex-col items-center mt-5 px-4 mb-5">
                <h1 className="text-2xl font-medium mb-5">Results for '{categoryName}'</h1>
                {loading ? (
                    <p className="text-lg text-gray-500">Loading...</p>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                        {products.map((product) => (
                            <ProductList key={product.productID} product={product}/>
                        ))}
                    </div>
                ) : (
                    <p className="text-lg text-gray-500">No products found for this category.</p>
                )}
            </main>
            <Footer />
        </div>
    )
}

export default Page
