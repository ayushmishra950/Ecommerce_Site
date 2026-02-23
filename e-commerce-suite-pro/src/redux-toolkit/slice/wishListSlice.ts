import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import {addProductToWishlist, getProductToWishlist,removeProductToWishlist, clearWishlist } from "@/services/service";

const initialState = {
    wishList: []
};
const user = JSON.parse(localStorage.getItem("user"));

const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        addAndRemoveWishList:(state, action: PayloadAction<any>) => {
            const item = state.wishList.find((v) => v._id === action.payload._id);
            if (item) {
                state.wishList = state.wishList.filter((v) => v._id !== action.payload._id);
                removeProductToWishlist(action.payload?._id, user?.id);
            } else {
                state.wishList.push(action.payload);
                addProductToWishlist(action.payload?._id, user?.id);
            }
        },
    },
}); 

export const { addAndRemoveWishList } = wishListSlice.actions;
export default wishListSlice.reducer;