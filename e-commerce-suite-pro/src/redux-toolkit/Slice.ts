import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {showToast} from "@/utils/showToast";

interface Category {
    _id: string;
    name: string;
}
interface CartItem {
    _id?: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    rating: number;
    category: Category;
    numReviews: number;
    isActive: boolean;
    shopId: string;
    images: string[];
}

interface CartQuantity extends CartItem {
    quantity: number;
    totalPrice: number;
}
interface Carts {
    items: CartQuantity[];
    wishList:CartQuantity[];
}

const initialState: Carts = {
    items: [],
    wishList:[]
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<CartItem>) => {
            console.log(action.payload)
            const item = state?.items?.find((v) => v?._id === action?.payload?._id);
            if (item) {
                item.quantity += 1;
                item.totalPrice = item?.price * item?.quantity;
            }
            else {
                state?.items?.push({ ...action?.payload, quantity: 1, totalPrice: action?.payload?.price })
            }
        },
        removeCart: (state, action: PayloadAction<string>) => {
            if(action.payload){
                 state.items = state.items.filter((i) => i?._id !== action?.payload);
                showToast("Item Removed", "Product removed from cart.")
            }
           
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            console.log(action?.payload)
            const item = state.items.find((v) => v?._id === action?.payload);
            console.log(item);
            if (item) {
                item.quantity += 1;
                item.totalPrice += item?.price;
            }
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find((v) => v?._id === action?.payload);
            if (!item) return;

            if (item.quantity === 1) {
                // Direct remove if quantity becomes 0
                state.items = state.items.filter(v => v._id !== action.payload);
            } else {
                item.quantity -= 1;
                item.totalPrice = item.price * item.quantity;
            }
        },

  addAndRemoveWishList: (state, action: PayloadAction<CartItem>) => {

    const index = state.wishList.findIndex(
        (item) => item._id === action.payload._id
    );

    if (index !== -1) {
        // REMOVE
        state.wishList.splice(index, 1);

        showToast(
            "Wishlist Item Removed.",
            "This product has been removed from your wishlist.",
            "info"
        );
    } else {
        // ADD
        state.wishList.push({
            ...action.payload,
            quantity: 0,
            totalPrice: action.payload.price
        });

        showToast(
            "Wishlist Item Added.",
            "This product is saved in your wishlist.",
            "success"
        );
    }
},
    }
})

export const { addCart, removeCart,addAndRemoveWishList,  incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;