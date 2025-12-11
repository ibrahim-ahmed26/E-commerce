import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/slices/productSlice";
import { addToCart, setIsAdding } from "../store/slices/cartSlice";
import { AiOutlineStar, AiFillStar, AiOutlineArrowLeft, AiOutlineShoppingCart } from "react-icons/ai";
import { gsap } from "gsap";
import Loading from "./Loading";
import ErrorFetchingProducts from "./ErrorFetchingProducts";
import toast from "react-hot-toast";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.product);
  const isAdding = useSelector((state) => state.cart.isAddingProductId);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProduct());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === "succeeded" && imageRef.current && contentRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    }
  }, [status, id]);

  const product = items.find((item) => item.id === parseInt(id));

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<AiFillStar key={i} className="text-yellow-500 text-2xl" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <AiFillStar key={i} className="text-yellow-500 opacity-50 text-2xl" />
        );
      } else {
        stars.push(<AiOutlineStar key={i} className="text-yellow-500 text-2xl" />);
      }
    }
    return stars;
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(setIsAdding(product.id));
    dispatch(addToCart(product));
    setTimeout(() => dispatch(setIsAdding(null)), 500);
    toast.success(`${product.title} added to cart!`);
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <ErrorFetchingProducts error={error} />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 mb-8 group"
        >
          <AiOutlineArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to Products</span>
        </button>
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            <div ref={imageRef} className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-square bg-gray-100 rounded-2xl p-8 flex items-center justify-center overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-semibold capitalize">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
            <div ref={contentRef} className="flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating.rate)}
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    {product.rating.rate.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              )}
              <div className="mb-8">
                <p className="text-5xl font-bold text-blue-600 mb-2">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500">Tax included. Shipping calculated at checkout.</p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding === product.id}
                  className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full transition-all duration-300 font-semibold text-lg shadow-lg ${
                    isAdding === product.id
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:scale-105"
                  }`}
                >
                  <AiOutlineShoppingCart className="text-2xl" />
                  {isAdding === product.id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Category</p>
                    <p className="font-semibold text-gray-800 capitalize">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Product ID</p>
                    <p className="font-semibold text-gray-800">#{product.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items
              .filter((item) => item.category === product.category && item.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => navigate(`/products/${relatedProduct.id}`)}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden bg-gray-100 h-48">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 min-h-10">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-xl font-bold text-blue-600">
                      ${relatedProduct.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}