import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice";
import wishListReducer from "../slice/wishListSlice";
import categoryReducer from "../slice/categorySlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishList: wishListReducer,
        category:categoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;