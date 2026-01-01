import "../../styles/addProduct.css";
import React, {useState} from "react";

function AddProduct() {

    const [selectedImages, setSelectedImages] = useState([]);
    const [productData, setProductData] = useState({
        name:"",
        criteria:"",
        price:"",
        description:""
    });

    const handleFileChange = (e)=>{
        const files = Array.from(e.target.files);
        const fileObjects = files.map(file =>({
            file: file,
            preview: URL>CreateObjectURL(file),
            name:file.name,
            size:(file.size/1024).toFixed(1)+ "KB"
        }));

        setSelectedImages((prev) =>[...prev, ...fileObjects]);
    };

    const removeImage = (index) =>{
        setSelectedImages(selectedImages.filter((_, i) => i !==index));
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
                {selectedImages.map((img, index)=>{
                    <div key ={index} className = "upload-item">
                        <div className = "item-info">
                            <img src = {img.preview} alt = "preview" className = "thumb-preview" />
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
                })}
            </div>
        </div>

        <form classname = "product-card add-product-form">
            <div className = "form-group">
                <label>Product Name</label>
                <input  
                    type = "text"
                    placeholder = "e.g. Handcrafted Shell Necklace"
                    value = {productData.name}
                    onChange = {(e)=>setProductData({...productData, name: e.target.value})}
                />
            </div>

            <div className = "form-group">
                <label>Criteria</label>
                <input
                    type = "text"
                    placeholder = "criteria"
                    value = {productData.criteria}
                    onChange = {(e) =>setProductData({...productData, criteria: e.target.value})}
                />
            </div>

            <div className = "form-group">
                <label>Price</label>
                <input
                    type="number"
                    placeholder="0.00"
                    value = {productData.price}
                    onChange = {(e)=>setProductData({...productData, price: e.target.value})}
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

            <button type = "button" className = "submit-btn">Publish Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
