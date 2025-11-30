import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/slices/productSlice";
export const store = configureStore({
    reducer:{
        product:productReducer
    }
})