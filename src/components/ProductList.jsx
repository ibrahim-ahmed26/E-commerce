import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";

export default function ProductList() {
    const dispatch = useDispatch()
    const { items, status, error } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(fetchProduct())
    }, [dispatch])
    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;
    console.log(items)
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-center text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                    Products
                </h2>
                <p className="text-center text-gray-600 mb-12 text-lg">Discover our curated collection</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((product) => (
                        <div
                            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                            key={product.id}
                        >
                            <div className="relative overflow-hidden bg-gray-100 h-64">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="text-3xl font-bold text-gray-900">
                                        ${product.price}
                                    </p>
                                    <button onClick={() => dispatch(addToCart(product))} className="bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg cursor-pointer">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
// category
// :
// "men's clothing"
// description
// :
// "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
// id
// :
// 1
// image
// :
// "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
// price
// :
// 109.95
// rating
// :
// count
// :
// 120
// rate
// :
// 3.9
// [[Prototype]]
// :
// Object
// title
// :
// "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"