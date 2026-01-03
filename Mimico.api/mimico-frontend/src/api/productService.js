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