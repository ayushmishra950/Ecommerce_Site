import React, { useEffect, useState } from "react";
import {getCategoryByUsers} from "@/services/service";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
type Category = {
  id: number;
  name: string;
  slug: string;
};
const dummyCategories: Category[] = [
  { id: 1, name: "Electronics", slug: "electronics" },
  { id: 2, name: "Men Clothing", slug: "men-clothing" },
  { id: 3, name: "Women Fashion", slug: "women-fashion" },
  { id: 4, name: "Shoes", slug: "shoes" },
  { id: 5, name: "Home & Kitchen", slug: "home-kitchen" },
];

const Category: React.FC = () => {
  const {user} = useAuth();
  const {toast} = useToast();
  const [categories, setCategories] = useState<any>([]);
  const navigate = useNavigate();

  const handleGetCategory = async() => {
    try{
      const res = await getCategoryByUsers();
      if(res.status === 200){
        setCategories(res?.data?.data);
      }
    }
    catch(err){
      console.log(err);
     toast({title:"Error", description:err.response.data.message, variant:"destructive"})
    }
  }

  useEffect(()=>{
    handleGetCategory()
  },[])
  return (
    <div className="w-44 bg-white border border-gray-200 shadow-lg rounded-md">
      {categories?.map((category) => (
        <a
          key={category._id}
          onClick={()=>{navigate("/products", {state:{id:category?._id}})}}
          className="block px-4 py-2 hover:bg-gray-100 transition capitalize cursor-pointer"
        >
          {category.name}
        </a>
      ))}
    </div>
  );
};


export default Category;
