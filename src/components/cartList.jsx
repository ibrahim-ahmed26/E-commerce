import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { decreaseQuantity, increaseQuantity, removeFromCart,clearItems } from "../store/slices/cartSlice";

export default function CartList() {
    const { items } = useSelector((state) => state.cart);
    console.log(items)
    const dispatch = useDispatch()
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                        <AiOutlineShoppingCart className="w-8 h-8" />
                        Shopping Cart
                    </h2>

                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-gray-100 rounded-full p-8">
                                <BsCart3 className="w-20 h-20 text-gray-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-3">Your cart is empty</h3>
                        <p className="text-gray-500 mb-8">Add some products to get started!</p>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-2 text-gray-800 flex items-center gap-3">
                    <AiOutlineShoppingCart className="w-8 h-8" />
                    Shopping Cart
                </h2>
                <p className="text-gray-600 mb-8">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>

                <div className="space-y-4 mb-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex gap-6 items-center"
                        >
                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                                    {item.description}
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    ${item.price}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors" onClick={()=> dispatch(decreaseQuantity(item.id))}>
                                    <AiOutlineMinus className="w-4 h-4 text-gray-600" />
                                </button>
                                <span className="text-lg font-semibold text-gray-800 w-8 text-center">
                                    {item.qty}
                                </span>
                                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors" onClick={() => dispatch(increaseQuantity(item.id))}>
                                    <AiOutlinePlus className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>

                            <button className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer" onClick={() => dispatch(removeFromCart(item.id))} >
                                <AiOutlineDelete className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 text-lg">Subtotal</span>
                        <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                    <button className="bg-red-500 w-full text-white py-4 px-4 rounded-xl hover:bg-red-600 transition-colors duration-300 text-lg shadow-md hover:shadow-lg mb-5" onClick={()=> dipatch(clearItems())}>
                        Clear Cart
                    </button>
                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg shadow-md hover:shadow-lg">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}