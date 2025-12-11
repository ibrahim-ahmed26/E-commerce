import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "../home/Home";
import Products from "../products/Products";
import Cart from "../cart/Cart";
import FallbackElement from "../FallbackElement";
import Checkout from "./CheckOut";
import SingleProduct from "./SingleProduct";

export default function AppLayout() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<FallbackElement />} />
            </Routes>
        </>
    )
}