import React, {useState, useEffect} from "react";
import {getAllProducts} from "../../api/productService";
import "../../styles/adminProducts.css";

const ViewProducts = ()=>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchProducts = async() =>{
            try{
                const data = await getAllProducts();
                setProducts(data);
            } catch(error){
                console.error("Error fetching products: ",error);
            }finally{
                setLoading(false);
            }
        };
        fetchProducts();
    },[]);

    if (loading) return <p className = "loading">Loading Products ...</p>;

    return (
        <div className = "admin-products-container">
            <h2>All Products</h2>

            <div className = "products-grid">
                {products.map((product)=>(
                    <div className = "product-card" key={product.id}>
                        <img 
                            src = {`http://localhost:5212/${product.images[0]?.imagePath}`}
                            alt = {product.Name}
                            className = "product-image"
                        />
                        <h3>{product.name}</h3>
                        <p className = "category">{product.category}</p>
                        <p className = "price">Rs. {product.price}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default ViewProducts;