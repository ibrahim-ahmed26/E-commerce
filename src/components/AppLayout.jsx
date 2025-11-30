import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "../home/Home";
import Products from "../products/Products";
import Cart from "../cart/Cart";
import FallbackElement from "../FallbackElement";

export default function AppLayout() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<FallbackElement />} />
            </Routes>
        </>
    )
}