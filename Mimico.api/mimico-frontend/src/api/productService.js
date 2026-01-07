import axiosInstance from "./axiosInstance";

export const createProduct = async(formData)=>{
    const response = await axiosInstance.post(
        "/admin/products",
        formData,
        {
            headers:{
                "Content-type": "multipart/form-data",
            },
        }
    );
    return response.data;
};

export const getAllProducts = async () => {
  const response = await axiosInstance.get("/admin/products/all");
  return response.data;
};