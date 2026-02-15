import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
// import { removeFromWishlist, clearWishlist } from "@/redux-toolkit/WishlistSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const wishlistItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
//   const [wishlistItems, setWishListItems] = useState([]);

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any products yet.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        to={`/product/${item._id}`}
                        className="font-semibold text-foreground hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.category.name}</p>
                      <p className="font-bold text-foreground mt-1">₹{item.price}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                    //   onClick={() => dispatch(removeFromWishlist(item._id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="outline" 
        // onClick={() => dispatch(clearWishlist())}
        >
          Clear Wishlist
        </Button>
      </div>
    </div>
  );
};

export default WishlistPage;
