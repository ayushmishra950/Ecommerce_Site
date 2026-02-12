import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {getProductById} from "@/services/service";

const ProductDetail = () => {
  const { id } = useParams();
  const{toast} = useToast();
  console.log(id)
  // const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product,setProduct] = useState(null);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
 const [showZoom, setShowZoom] = useState(false);
const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });




useEffect(() => {
  if (product?.images?.length > 0) {
    setSelectedImage(product.images[0]);
  }
}, [product]);


  // if (!product) {
  //   return (
  //     <div className="container mx-auto px-4 py-16 text-center">
  //       <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
  //       <Button asChild>
  //         <Link to="/products">Back to Products</Link>
  //       </Button>
  //     </div>
  //   );
  // }
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  setZoomPosition({
    x: Math.min(Math.max(x, 0), 100),
    y: Math.min(Math.max(y, 0), 100),
  });
};




  const discount = product?.originalPrice
    ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)
    : 0;

    
      const handleGetProduct = async() => {
        console.log("start...")
        // if(!id) return toast({title:"Error", description:"Product Id Not Found.", variant:"destructive"})
        try{
         const res = await  getProductById(id);
         console.log(res);
         console.log("mediuming")
         if(res.status===200){
          console.log("ending")
          setProduct(res?.data?.data)
         }
        }
        catch(err){
          console.log(err);
        toast({title:"Error", description:err.response.data.message, variant:"destructive"})
        }
      };
    
      useEffect(()=>{
        handleGetProduct();
      },[])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-foreground">Products</Link>
        <span>/</span>
        <span className="text-foreground">{product?.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative">
          {/* <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
            <img
              src={product?.images?.[0]}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product?.discountPrice > 0 && (
            <Badge variant="destructive" className="absolute top-4 left-4 text-lg px-3 py-1">
              -{product?.discountPrice}%
            </Badge>
          )} */}



   <div className="flex items-start gap-4">

  {/* 🔹 Main Image */}
  <div
    className="relative w-[500px] h-[500px] rounded-2xl overflow-hidden bg-muted cursor-crosshair flex-shrink-0"
    onMouseEnter={() => setShowZoom(true)}
    onMouseLeave={() => setShowZoom(false)}
    onMouseMove={handleMouseMove}
  >
    <img
      src={selectedImage}
      alt={product?.name}
      className="w-full h-full object-cover"
    />
     {product?.discountPrice > 0 && (
            <Badge variant="destructive" className="absolute top-4 left-4 text-lg px-3 py-1">
              -{product?.discountPrice}%
            </Badge>
          )} 
  </div>

  {/* 🔹 Zoom Card (Right Side) */}
  {showZoom && (
    <div
      className="w-[500px] h-[500px] rounded-2xl border shadow-2xl bg-white flex-shrink-0"
      style={{
        backgroundImage: `url(${selectedImage})`,
        backgroundSize: "700%", // 🔥 Strong zoom
        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
        backgroundRepeat: "no-repeat",
      }}
    />
  )}

</div>


          {/* 🔹 Thumbnail Images */}
  <div className="flex gap-3 mt-4">
    {product?.images?.slice(0, 4).map((img: string, index: number) => (
      <div
        key={index}
        onClick={() => setSelectedImage(img)}
        className={`w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition ${
          selectedImage === img
            ? "border-primary"
            : "border-transparent"
        }`}
      >
        <img
          src={img}
          alt={`thumbnail-${index}`}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-primary font-medium mb-2">{product?.category?.name}</p>
          <h1 className="text-3xl font-bold text-foreground mb-4">{product?.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < Math.floor(product?.rating)
                      ? 'fill-primary text-primary'
                      : 'text-muted'
                  )}
                />
              ))}
            </div>
            <span className="text-foreground font-medium">{product?.rating}</span>
            <span className="text-muted-foreground">({product?.numReviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-foreground">₹{product?.price}</span>
            {product?.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product?.originalPrice}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-8">{product?.description}</p>

          {/* Variants */}
          {product?.variants?.map((variant) => (
            <div key={variant?.id} className="mb-6">
              <p className="font-medium text-foreground mb-3">{variant?.name}</p>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option, i) => (
                  <Button
                    key={option}
                    variant={i === 0 ? 'default' : 'outline'}
                    size="sm"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="mb-8">
            <p className="font-medium text-foreground mb-3">Quantity</p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <Button
              size="lg"
              className="flex-1"
              disabled={!product?.inStock}
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product?.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={cn('h-5 w-5', isWishlisted && 'fill-destructive text-destructive')} />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-sm text-muted-foreground">Free Shipping</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-sm text-muted-foreground">2 Year Warranty</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-sm text-muted-foreground">30-Day Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product?.reviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none text-muted-foreground">
              <p>{product?.description}</p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{product?.category}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Availability</p>
                <p className="font-medium">{product?.inStock ? 'In Stock' : 'Out of Stock'}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <p className="text-muted-foreground">Customer reviews coming soon...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
