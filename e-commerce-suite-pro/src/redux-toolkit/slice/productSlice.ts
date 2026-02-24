import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    productList : []
}


const productSlice = createSlice({
    name:"Products",
    initialState,
    reducers : {
         setProductList : (state, action:PayloadAction<any>) => {
            state.productList = action?.payload;
         }
    }
})

export const {setProductList} = productSlice?.actions;

export default productSlice.reducer;