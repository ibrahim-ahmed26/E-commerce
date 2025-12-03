import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/slices/productSlice";
import cartReducer from "../store/slices/cartSlice";
export const store = configureStore({
    reducer:{
        product:productReducer,
        cart:cartReducer
    }
})