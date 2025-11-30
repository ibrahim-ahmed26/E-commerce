import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Products from "./products/Products";
import Cart from "./cart/Cart";
import FallbackElement from "./FallbackElement";
import AppLayout from "./components/AppLayout";

export default function App() {
  return (
    <AppLayout />
  );
}
