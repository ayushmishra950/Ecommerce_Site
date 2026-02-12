import api from "@/api/axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL

// Admin Controllers for Only Admin Not Users==================================
//===============================================================================
//===============================================================================
//===============================================================================

export const registerUser = async(obj : any) =>{
    const res = await api.post(`/api/user/auth/register`, obj);
    return res;
}


export const loginUser = async(obj : any) =>{
    const res = await api.post(`/api/admin/auth/login`, obj);
    return res;
}

export const addCategory = async(obj:any) =>{
    const res = await api.post(`/api/admin/category`, obj);
    return res;
}

export const updateCategory = async(obj:any) =>{
    const res = await api.put(`/api/admin/category`, obj);
    return res;
}


export const deleteCategory = async(obj:any) =>{
    const res = await api.delete(`/api/admin/category`,{params : obj});
    return res;
}


export const getCategory = async(obj:any) =>{
    const res = await api.get(`/api/admin/category`,{params:obj});
    return res;
}


export const categoryStatus = async(obj:any) =>{
    const res = await api.patch(`/api/admin/category/status`,obj);
    return res;
}


export const addProduct = async(obj:any) =>{
    const res = await api.post(`/api/admin/product`, obj);
    return res;
}


export const getProduct = async(shopId:string, adminId:string) =>{
    const res = await api.get(`/api/admin/product`, {params : {shopId, adminId}});
    return res;
}


export const updateProduct = async(obj:any, id:string) =>{
    const res = await api.put(`/api/admin/product/${id}`, obj);
    return res;
}


export const deleteProduct = async(obj:any) =>{
    const res = await api.delete(`/api/admin/product`, {params:obj});
    return res;
}


export const productStatus = async(obj:any) =>{
    const res = await api.patch(`/api/admin/product/status`,obj);
    return res;
};

export const getAdminData = async(id:string,shopId:string) => {
    const res = await api.get(`/api/admin/auth/getbyid`,{params:{id, shopId}});
    return res;
}


export const updateAdminData = async(id:string,shopId:string, storeSettings:any,profile:any) => {
    const res = await api.put(`/api/admin/auth/update`,{id, shopId, storeSettings, profile});
    return res;
}



// User Controllers for Only Users Not Admin==================================
//===============================================================================
//===============================================================================
//===============================================================================



export const getCategoryByUsers = async() =>{
    const res = await api.get(`/api/user/product/category/allCategory`);
    return res;
}


export const getProductByCategoryId = async(id:string) =>{
    const res = await api.get(`/api/user/product/allproduct/${id}`);
    return res;
}


export const getProductById = async(id:string) =>{
    const res = await api.get(`/api/user/product/${id}`);
    return res;
}

export const getProductsByUsers = async() =>{
    const res = await api.get(`/api/user/product`);
    return res;
}

