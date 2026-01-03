import "../../styles/addProduct.css";
import React, {useState} from "react";
import {createProduct} from "../../api/productService";

function AddProduct() {

    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [productData, setProductData] = useState({
        name:"",
        price:"",
        description:"",
        category:"",
    });

    const handleFileChange = (e)=>{
        const files = Array.from(e.target.files);

        const fileObjects = files.map(file =>({
            file,
            preview: URL.createObjectURL(file),
            name:file.name,
            size:(file.size/1024).toFixed(1)+ "KB"
        }));

        setSelectedImages((prev) =>[...prev, ...fileObjects]);
    };

    const removeImage = (index) =>{
        URL.revokeObjectURL(selectedImages[index].preview);
        setSelectedImages(selectedImages.filter((_, i) => i !==index));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!productData.name || !productData.category || !productData.price){
            alert("Please fill all required fields");
            return;
        }

        if(selectedImages.length===0){
            alert("Please upload at least one image");
            return;
        }

        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("category", productData.category);

        selectedImages.forEach((img) =>{
            formData.append("images", img.file);
        });

        try{
            setLoading(true);

            await createProduct(formData);
            alert("Product added successfullly");

            //reset form
            setProductData({
                name:"",
                description:"",
                price:"",
                cetegory:"",
            });
            setSelectedImages([]);
        }catch(error){
            console.error(error);
            alert("Error adding product");
        }finally{
            setLoading(false);
        }
    };
  return (
    <div className="add-product-container">
      <h2 className = "page-title">Add New Product</h2>

      <div className = "add-product-grid">
        <div className = "product-card upload-card">
            <h3>Add Images</h3>

            <label className = "drop-zone">
                <i className = "fas fa-cloud-upload-alt"></i>
                <p>Drop your files here, or <span>Browse</span></p>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    hidden
                    accept="image/*"
                />
            </label>

            <div className = "upload-list">
                {selectedImages.map((img, index)=>(
                    <div key ={index} className = "upload-item">
                        <div className = "item-info">
                            <img src = {img.preview} alt = "preview" className = "thumb-preview" 
                            />
                            <div className = "file-details">
                                <p className = "file-name">{img.name}</p>
                                <p className = "file-size">{img.size}</p>
                            </div>
                        </div>
                        <i
                            className = "fas fa-trash-alt delete-icon"
                            onClick={()=> removeImage(index)}
                            title="Remove Image"
                        ></i>
                    </div>
                ))}
            </div>
        </div>

        <form className = "product-card add-product-form" onSubmit={handleSubmit}>
            <div className = "form-group">
                <label>Product Name</label>
                <input  
                    type = "text"
                    placeholder = "e.g. Handcrafted Shell Necklace"
                    value = {productData.name}
                    onChange = {(e)=>setProductData({...productData, name: e.target.value})}
                    required
                />
            </div>

            <div className = "form-group">
                <label>Category</label>
                <select 
                    value={productData.category}
                    onChange={(e)=>{
                        setProductData({...productData,category: e.target.value})
                    }}
                    required
                >
                    <option value = "">Select category</option>
                    <option value= "Necklace">Necklace</option>
                    <option value = "Anklet">Anklet</option>
                    <option value = "Phone charms">Phone charms</option>
                    <option value = "Bracelet">Bracelet</option>
                    <option value = "Earrings">Earrings</option>
                    <option value = "Ring">Ring</option>
                </select>
            </div>

            <div className = "form-group">
                <label>Price</label>
                <input
                    type="number"
                    placeholder="0.00"
                    value = {productData.price}
                    onChange = {(e)=>setProductData({...productData, price: e.target.value})}
                    required
                />
            </div>

            <div className = "form-group">
                <label>Description</label>
                <textarea
                    rows = "6"
                    placeholder = "Describe the beach-vibe story of the jewelry..."
                    value = {productData.description}
                    onChange= {(e)=> setProductData({...productData, description: e.target.value})}
                    ></textarea>
            </div>

            <button type = "submit" className = "submit-btn" disabled={loading}>
                {loading ? "Publishing...":"Publish Product"}
            </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
