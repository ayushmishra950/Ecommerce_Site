import { Link } from 'react-router-dom';
import { Smartphone, Shirt, Watch, Home, Dumbbell, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/products';
import { useEffect, useState } from 'react';
import {getCategoryByUsers} from "@/services/service";
import { useToast } from '@/hooks/use-toast';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Shirt,
  Watch,
  Home,
  Dumbbell,
  Sparkles
};

export const CategorySection = () => {
    const [categoryList, setCategoryList] = useState([]);
    const {toast} = useToast();

     const handleGetCategory = async() => {
         try{
            const res = await getCategoryByUsers();
            console.log(res?.data?.data)
                    setCategoryList(res?.data?.data)
         }
         catch(err){
          toast({title:"Error Category.", description:err?.response?.data?.message|| err?.message, variant:"destructive"})
         }
      }
      useEffect(()=>{
        handleGetCategory()
      },[])
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryList?.map((category) => {
            const Icon = iconMap[category.icon] || Smartphone;
            return (
              <Link key={category._id} to={`/products?category=${category.name}`}>
                <Card className="group hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category?.product?.length} items</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
