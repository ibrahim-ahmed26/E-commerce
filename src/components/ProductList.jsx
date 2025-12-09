import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/slices/productSlice";
import { addToCart, setIsAdding } from "../store/slices/cartSlice";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "./Loading";
import ErrorFetchingProducts from "./ErrorFetchingProducts";
import toast from "react-hot-toast";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.product);
  const isAdding = useSelector((state) => state.cart.isAddingProductId)
  const cardsRef = useRef([]);
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    if (status === "succeeded" && items.length !== 0) {
      cardsRef.current.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.4 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%", // when card enters view
              end: "top 30%", // while centered
              toggleActions: "play reverse play reverse",
              scrub: true,
            },
          }
        );
      });
    }
  }, [status, items]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProduct());
    }
  }, [dispatch, status]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<AiFillStar key={i} className="text-yellow-500" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <AiFillStar key={i} className="text-yellow-500 opacity-50" />
        );
      } else {
        stars.push(<AiOutlineStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  if (status === "loading") {
    {
      <Loading />;
    }
  }

  if (status === "failed") {
    {
      <ErrorFetchingProducts error={error} />;
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Products
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Discover our curated collection
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((product, index) => (
            <div
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
              key={product.id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="relative overflow-hidden bg-gray-100 h-64">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-gray-700 capitalize">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-14">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2 min-h-10">
                  {product.description}
                </p>

                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {renderStars(product.rating.rate)}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {product.rating.rate.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.rating.count})
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </p>
                  <button
                    onClick={() => {
                      dispatch(setIsAdding(product.id));
                      dispatch(addToCart(product));
                      setTimeout(() => dispatch(setIsAdding(null)), 500);
                      toast.success(`Product ${product.id} Added Successfull`)
                    }}
                    disabled={isAdding === product.id}
                    className={`px-6 py-2 rounded-full transition-colors duration-300 font-medium shadow-md ${isAdding === product.id
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                      }`}
                  >
                    {isAdding === product.id ? 'Adding...' : 'Add to Cart'}
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
