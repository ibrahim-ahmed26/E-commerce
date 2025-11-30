import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const PRODUCTAPI = "https://fakestoreapi.com/products"
export const fetchProduct = createAsyncThunk('product/fetchProducts', async () => {
    const response = await fetch(PRODUCTAPI);
    const data = await response.json()
    return data
})
const productSlice = createSlice({
    name: "product",
    initialState: {
        items: [],
        status: "idle",
        error: null
    }
    , reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message
        })
    }
}
)
export default productSlice.reducer;