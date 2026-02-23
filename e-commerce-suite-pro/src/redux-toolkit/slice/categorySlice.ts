import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    categoryList : []
}


const categorySlice = createSlice({
    name:"Category",
    initialState,
    reducers:{
        getCategoryList : (state, action:PayloadAction<any>) => {
            state.categoryList = action.payload
        }
    }
})

export const {getCategoryList} = categorySlice.actions;
export default categorySlice.reducer;