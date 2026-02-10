import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL

// Admin Controllers for Only Admin Not Users==================================
//===============================================================================
//===============================================================================
//===============================================================================

export const registerUser = async(obj : any) =>{
    const res = await axios.post(`${BASE_URL}/api/user/auth/register`, obj);
    return res;
}


export const loginUser = async(obj : any) =>{
    const res = await axios.post(`${BASE_URL}/api/admin/auth/login`, obj);
    return res;
}

export const addCategory = async(obj:any) =>{
    const res = await axios.post(`${BASE_URL}/api/admin/category`, obj);
    return res;
}

export const updateCategory = async(obj:any) =>{
    const res = await axios.put(`${BASE_URL}/api/admin/category`, obj);
    return res;
}


export const deleteCategory = async(obj:any) =>{
    const res = await axios.delete(`${BASE_URL}/api/admin/category`,{params : obj});
    return res;
}


export const getCategory = async(obj:any) =>{
    const res = await axios.get(`${BASE_URL}/api/admin/category`,{params:obj});
    return res;
}


export const categoryStatus = async(obj:any) =>{
    const res = await axios.patch(`${BASE_URL}/api/admin/category/status`,obj);
    return res;
}


export const addProduct = async(obj:any) =>{
    const res = await axios.post(`${BASE_URL}/api/admin/product`, obj);
    return res;
}


export const getProduct = async(shopId:string, adminId:string) =>{
    const res = await axios.get(`${BASE_URL}/api/admin/product`, {params : {shopId, adminId}});
    return res;
}


export const updateProduct = async(obj:any, id:string) =>{
    const res = await axios.put(`${BASE_URL}/api/admin/product/${id}`, obj);
    return res;
}


export const deleteProduct = async(obj:any) =>{
    const res = await axios.delete(`${BASE_URL}/api/admin/product`, {params:obj});
    return res;
}


export const productStatus = async(obj:any) =>{
    const res = await axios.patch(`${BASE_URL}/api/admin/product/status`,obj);
    return res;
};

export const getAdminData = async(id:string,shopId:string) => {
    const res = await axios.get(`${BASE_URL}/api/admin/auth/getbyid`,{params:{id, shopId}});
    return res;
}


export const updateAdminData = async(id:string,shopId:string, storeSettings:any,profile:any) => {
    const res = await axios.put(`${BASE_URL}/api/admin/auth/update`,{id, shopId, storeSettings, profile});
    return res;
}



// User Controllers for Only Users Not Admin==================================
//===============================================================================
//===============================================================================
//===============================================================================



export const getCategoryByUsers = async() =>{
    const res = await axios.get(`${BASE_URL}/api/user/product/category/allCategory`);
    return res;
}


export const getProductByCategoryId = async(id:string) =>{
    const res = await axios.get(`${BASE_URL}/api/user/product/allproduct/${id}`);
    return res;
}