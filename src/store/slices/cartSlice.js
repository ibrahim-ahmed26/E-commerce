import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const exsitingItem = state.items.find((i) => i.id === action.payload.id)
            if (exsitingItem) {
                exsitingItem.qty += 1;
            } else {
                state.items.push({ ...action.payload, qty: 1 })
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) item.qty += 1;
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item && item.qty > 1) item.qty -= 1
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
})
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer