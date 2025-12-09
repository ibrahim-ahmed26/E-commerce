import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../../helpers/getLocalStorage";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: getLocalStorage(),
        isAddingProductId: null,
    },
    reducers: {
        addToCart: (state, action) => {
            const exsitingItem = state.items.find((i) => i.id === action.payload.id)
            if (exsitingItem) {
                exsitingItem.qty += 1;
            } else {
                state.items.push({ ...action.payload, qty: 1 })
            }
            setLocalStorage(state.items)
        },
        setIsAdding: (state, action) => {
            state.isAddingProductId = action.payload

        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
            setLocalStorage(state.items)
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) item.qty += 1;
            setLocalStorage(state.items)
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item && item.qty > 1) item.qty -= 1
            setLocalStorage(state.items)
        },
        clearCart: (state) => {
            state.items = [];
            setLocalStorage(state.items)
        }
    }
})
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, setIsAdding } = cartSlice.actions
export default cartSlice.reducer