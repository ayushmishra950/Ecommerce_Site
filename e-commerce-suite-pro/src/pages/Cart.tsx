import { Link, useNavigate } from 'react-router-dom';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Heart,
  Truck,
  Shield,
  Package,
  Gift,
  ArrowLeft,
  Sparkles,
  Check,
  X,
  Star,
  BadgePercent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/redux-toolkit/store";
import { decrementQuantity, incrementQuantity, removeCart } from '@/redux-toolkit/Slice';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Recommended Products Dummy Data
const recommendedProducts = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 3999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 4.6,
  },
  {
    id: "2",
    name: "Wireless Mouse",
    price: 1299,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    rating: 4.4,
  },
  {
    id: "3",
    name: "USB-C Hub",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400",
    rating: 4.7,
  },
];

const Cart = () => {
  const { removeFromCart, updateQuantity, total, clearCart } = useCart();
  const items = useSelector((state: RootState) => state?.cart?.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [savedItems, setSavedItems] = useState<any[]>([]);

  // Calculate totals
  let subtotal = 0;
  items?.forEach((item) => {
    subtotal += item?.totalPrice || 0;
  });

  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const discountAmount = (subtotal * discount) / 100;
  const totalSavings = items?.reduce((acc, item) => {
    const originalTotal = (item?.price) * item?.quantity;
    const currentTotal = item?.price * item?.quantity;
    return acc + (originalTotal - currentTotal);
  }, 0);

  const grandTotal = subtotal + shipping + tax - discountAmount;

  // Coupon codes
  const coupons = {
    'SAVE10': { discount: 10, minOrder: 1000 },
    'SAVE20': { discount: 20, minOrder: 2000 },
    'FIRST50': { discount: 50, minOrder: 500 },
  };

  const applyCoupon = () => {
    const coupon = coupons[couponCode.toUpperCase() as keyof typeof coupons];
    if (coupon && subtotal >= coupon.minOrder) {
      setDiscount(coupon.discount);
      setAppliedCoupon(couponCode.toUpperCase());
      toast({
        title: "Coupon Applied! 🎉",
        description: `You saved ${coupon.discount}% on your order`,
      });
    } else if (coupon) {
      toast({
        title: "Minimum Order Not Met",
        description: `Add ₹${coupon.minOrder - subtotal} more to use this coupon`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code",
        variant: "destructive",
      });
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode('');
    toast({
      title: "Coupon Removed",
      description: "Coupon has been removed from your order",
    });
  };

  const saveForLater = (item: any) => {
    setSavedItems([...savedItems, item]);
    dispatch(removeCart(item._id));
    toast({
      title: "Saved for Later",
      description: `${item.name} has been moved to saved items`,
    });
  };

  const moveToCart = (item: any) => {
    setSavedItems(savedItems.filter(i => i._id !== item._id));
    // Add to cart logic here
    toast({
      title: "Moved to Cart",
      description: `${item.name} has been added back to cart`,
    });
  };

  const handleClearCart = () => {
    // dispatch(clearAllCart());
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
            <Sparkles className="h-8 w-8 text-yellow-400 absolute top-0 right-1/3 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Looks like you haven't added anything yet. Start shopping and discover amazing products!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400">
              <Link to="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Cart Items</h2>
                  {items.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearCart}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  )}
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <Link
                        to={`/product/${item._id}`}
                        className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 group"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 min-w-0 pr-4">
                            <Link
                              to={`/product/${item._id}`}
                              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-lg block mb-1 truncate"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-600 mb-2">
                              {item?.category?.name || 'General'}
                            </p>
                            {item?.stock < 10 && item?.stock > 0 && (
                              <p className="text-xs text-orange-600 font-semibold flex items-center gap-1">
                                <Package className="w-3 h-3" />
                                Only {item?.stock} left in stock!
                              </p>
                            )}
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-red-600 hover:bg-red-50 -mt-1"
                            onClick={() => {
                              dispatch(removeCart(item._id));
                              toast({
                                title: "Item Removed",
                                description: `${item.name} has been removed from cart`,
                              });
                            }}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white"
                              onClick={() => dispatch(decrementQuantity(item._id))}
                              disabled={item?.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center font-semibold text-gray-900">
                              {item?.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white"
                              onClick={() => dispatch(incrementQuantity(item._id))}
                              disabled={item?.quantity >= (item?.stock || 999)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">
                              ₹{item?.totalPrice?.toLocaleString()}
                            </p>
                            {/* {item?.originalPrice && item?.originalPrice > item?.price && ( */}
                            <p className="text-sm text-gray-500 line-through">
                              {/* ₹{(item?.originalPrice * item?.quantity)?.toLocaleString()} */}
                            </p>
                            {/* )} */}
                          </div>
                        </div>

                        {/* Save for Later */}
                        <div className="flex items-center gap-4 mt-4">
                          <button
                            onClick={() => saveForLater(item)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                          >
                            <Heart className="w-4 h-4" />
                            Save for Later
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved for Later */}
            {savedItems.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Saved for Later ({savedItems.length})</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {savedItems.map((item) => (
                    <div key={item._id} className="p-6 flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-lg font-bold text-gray-900 mt-1">₹{item?.price?.toLocaleString()}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2"
                          onClick={() => moveToCart(item)}
                        >
                          Move to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Products */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">You May Also Like</h2>
              <div className="grid grid-cols-3 gap-4">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="cursor-pointer group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-3 h-3',
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            {/* Coupon Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Apply Coupon</h3>
              </div>

              {appliedCoupon ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900">{appliedCoupon}</p>
                        <p className="text-sm text-green-700">Coupon applied successfully!</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={removeCoupon}
                      className="text-green-600 hover:text-green-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button onClick={applyCoupon} className="bg-blue-600 hover:bg-blue-700">
                    Apply
                  </Button>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-600 font-semibold">Available Coupons:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(coupons).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCouponCode(code);
                      }}
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold hover:bg-blue-100 transition-colors"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <BadgePercent className="w-4 h-4" />
                      Item Discount
                    </span>
                    <span className="font-semibold">-₹{totalSavings.toLocaleString()}</span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      Coupon Discount ({discount}%)
                    </span>
                    <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Tax (GST 18%)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-blue-600">₹{grandTotal.toFixed(2)}</span>
                </div>

                {shipping > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm text-orange-800">
                      <Gift className="w-4 h-4 inline mr-1" />
                      Add <span className="font-bold">₹{(500 - subtotal).toFixed(2)}</span> more for FREE shipping!
                    </p>
                  </div>
                )}

                <Button
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/30"
                  size="lg"
                  asChild
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-6 h-6 mx-auto text-green-600 mb-1" />
                    <p className="text-xs text-gray-600 font-semibold">Secure</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Truck className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                    <p className="text-xs text-gray-600 font-semibold">Fast Ship</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Package className="w-6 h-6 mx-auto text-orange-600 mb-1" />
                    <p className="text-xs text-gray-600 font-semibold">Easy Return</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
