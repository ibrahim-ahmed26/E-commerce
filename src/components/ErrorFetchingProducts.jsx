import { useDispatch } from "react-redux";
import { fetchProduct } from "../store/slices/productSlice";

export default function ErrorFetchingProducts({ error }) {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-red-600 mb-6">
          {error || "Failed to load products"}
        </p>
        <button
          onClick={() => dispatch(fetchProduct())}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
