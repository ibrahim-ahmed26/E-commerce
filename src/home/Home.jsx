import { useEffect, useRef } from "react";
import { AiOutlineArrowRight, AiOutlineStar } from "react-icons/ai";
import { BsLightning, BsShield, BsTruck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../components/Loading";
import ErrorFetchingProducts from "../components/ErrorFetchingProducts";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items: featuredProducts,
    status,
    error,
  } = useSelector((state) => state.product);

  // Section refs
  const featuresSectionRef = useRef();
  const categoriesSectionRef = useRef();
  const productsSectionRef = useRef();
  const ctaSectionRef = useRef();
  const newsletterSectionRef = useRef();
  const homeRef = useRef();
  const imageRef = useRef();
  useEffect(() => {
    if (status === "idle") dispatch(fetchProduct());
  }, [dispatch, status]);

  useEffect(() => {
    // Animate features section
    if (featuresSectionRef.current) {
      gsap.fromTo(
        featuresSectionRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate categories section
    if (categoriesSectionRef.current) {
      gsap.fromTo(
        categoriesSectionRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: categoriesSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate products section
    if (productsSectionRef.current) {
      gsap.fromTo(
        productsSectionRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productsSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    //Animate Home Section
    if (homeRef.current) {
      gsap.fromTo(
        homeRef.current,
        { x: -800, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: "1",
          scrollTrigger: {
            trigger: homeRef.current,
            start: "top 100%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    //Animate Image
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: 400, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: "1",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 100%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    // Animate CTA section
    if (ctaSectionRef.current) {
      gsap.fromTo(
        ctaSectionRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate newsletter section
    if (newsletterSectionRef.current) {
      gsap.fromTo(
        newsletterSectionRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [status]);

  const handleAddToCart = (product) => dispatch(addToCart(product));

  const categories = [
    { name: "Electronics", icon: "⚡", color: "from-blue-500 to-purple-500" },
    { name: "Audio", icon: "🎧", color: "from-pink-500 to-rose-500" },
    { name: "Cameras", icon: "📷", color: "from-orange-500 to-red-500" },
    { name: "Accessories", icon: "⌚", color: "from-green-500 to-teal-500" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDIwIEwgMjAgMCBNIDAgMCBMIDIwIDIwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8" ref={homeRef}>
              <div className="inline-block">
                <span className="bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                  New Collection 2024
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Elevate Your
                <span className="block bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Tech Experience
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Discover premium products designed for those who demand
                excellence. Quality meets innovation.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/products")}
                  className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Shop Now <AiOutlineArrowRight className="text-lg" />
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300"
                >
                  Explore
                </button>
              </div>
            </div>
            <div className="relative hidden md:block" ref={imageRef}>
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
                alt="Featured Product"
                className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        ref={featuresSectionRef}
        className="py-12 bg-gray-50 border-y border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <BsTruck className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <BsShield className="text-2xl text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-600">
                  100% secure transactions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-full">
                <BsLightning className="text-2xl text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                <p className="text-sm text-gray-600">2-3 business days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section ref={categoriesSectionRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div
                  className={`bg-linear-to-br ${category.color} p-8 rounded-2xl text-center transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}
                >
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section ref={productsSectionRef} className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked favorites just for you
            </p>
          </div>

          {status === "loading" && <Loading />}
          {status === "failed" && <ErrorFetchingProducts error={error} />}

          {status === "succeeded" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.slice(0, 8).map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden bg-gray-100 h-64">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.rating && (
                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <AiOutlineStar className="text-yellow-500" />
                          <span className="text-sm font-semibold">
                            {product.rating.rate || product.rating}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-gray-900">
                          ${product.price}
                        </p>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button
                  onClick={() => navigate("/products")}
                  className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View All Products
                </button>
              </div>
            </>
          )}
        </div>
      </section>
      <section
        ref={ctaSectionRef}
        className="py-20 px-4 bg-linear-to-r from-blue-600 to-purple-600 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers and experience premium quality
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            Start Shopping
          </button>
        </div>
      </section>

      <section ref={newsletterSectionRef} className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay in the Loop
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to get special offers, free giveaways, and exclusive deals
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
