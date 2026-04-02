import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    bannerList : []
}


const bannerSlice = createSlice({
    name:"Banner",
    initialState,
    reducers:{
        setBannerList : (state, action:PayloadAction<any>) => {
            state.bannerList = action.payload
        }
    }
})

export const {setBannerList} = bannerSlice.actions;
export default bannerSlice.reducer;