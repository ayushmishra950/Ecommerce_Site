import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { addToCart, removeFromCart } from '@/redux-toolkit/slice/cartSlice';
import { addAndRemoveWishList } from '@/redux-toolkit/slice/wishListSlice';
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hooks/hook';
import { addProductToWishlist, getProductToWishlist, removeProductToWishlist, clearWishlist, addCart } from "@/services/service";
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';


export const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  // const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const wishList = useAppSelector((state) => state?.wishList?.wishList);
  const isWishlisted = Boolean(wishList?.find((v) => v?._id === product?._id));
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddAndRemoveWishlist = async (product) => {

    const item = wishList.find((v) => v?._id === product?._id);
    try {
      let res = null;
      if (item) {
        res = await removeProductToWishlist(item?._id, user?.id);
      }
      else {
        res = await addProductToWishlist(product?._id, user?.id);
      }
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch(addAndRemoveWishList(product));
        toast({ title: item?._id ? "Remove Item To Wishlist." : "Add Item To Wishlist.", description: res?.data?.message })
      }
    }
    catch (err) {
      console.log(err)
      toast({ title: "Error Wishlist Product.", description: err?.message || err?.response?.data?.message, variant: "destructive" })
    }
  };

  const handleAddCart = async (product) => {
    let quantity = 1;
    try {
      const res = await addCart(product?._id, quantity);
      console.log(res)
      if (res.status === 201) {
        toast({ title: "Add Item To Cart.", description: res?.data?.message })
        dispatch(addToCart(product))

      }
    }
    catch (err) {
      console.log(err);
      toast({ title: "Error Add Cart.", description: err?.response?.data?.message || err?.message, variant: "destructive" })
    }
  }
  if (!product) return null;

  return (
    <Card
      className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to={`/product/${product._id}`}>
          <img
            src={product?.images?.[0]}
            alt={product?.name}
            className={cn(
              'w-full h-full object-cover transition-transform duration-500',
              isHovered && 'scale-110'
            )}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge variant="destructive" className="font-semibold">
              -{discount}%
            </Badge>
          )}
          {!product.stock && (
            <Badge variant="secondary">Out of Stock</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            'absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity',
            isWishlisted && 'opacity-100'
          )}
          onClick={() => { handleAddAndRemoveWishlist(product) }}
        >
          <Heart
            className={cn('h-4 w-4', isWishlisted && 'fill-destructive text-destructive')}
          />
        </Button>

        {/* Quick Add Button */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent',
            'translate-y-full group-hover:translate-y-0 transition-transform duration-300'
          )}
        >
          <Button
            className="w-full"
            size="sm"
            disabled={!product.stock}
            onClick={() => { handleAddCart(product) }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <Link to={`/product/${product._id}`}>
          <p className="text-sm text-muted-foreground mb-1">{product.category?.name}</p>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.numReviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
