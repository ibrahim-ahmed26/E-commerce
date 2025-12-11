/* eslint-disable no-useless-escape */
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { clearCart } from "../store/slices/cartSlice";
import { toast } from "react-hot-toast";
import { FiShoppingBag, FiMapPin, FiUser, FiDollarSign } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      country: ""
    }
  });

  const [activeStep, setActiveStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // eslint-disable-next-line react-hooks/incompatible-library
  const formData = watch();

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.qty) || 1;
    return sum + (price * qty);
  }, 0);
  console.log(subtotal)
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    toast.loading("Processing your order...");

    setTimeout(() => {
      toast.dismiss();
      toast.success("Order placed successfully! 🎉");
      dispatch(clearCart());
      setOrderPlaced(true);
    }, 2000);
  };

  // Validation for progressing to next step
  const canProceedToStep2 = () => {
    const step1Fields = ['fullName', 'email', 'phone', 'address', 'city', 'zipCode', 'country'];
    return step1Fields.every(field => formData[field] && !errors[field]);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 mb-2">Thank you for your purchase</p>
          <p className="text-xl text-gray-500 mb-8">
            Order confirmation has been sent to {formData.email}
          </p>
          <button className="w-fit px-2 capitalize bg-primary text-white py-4 rounded-xl" onClick={()=>navigate("/products")}>
            back to Products
          </button>
        </div>
      </div >
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <button className="w-fit px-2 capitalize bg-primary text-white py-4 rounded-xl" onClick={()=>navigate("/products")}>
            back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Checkout
            </span>
          </h1>
          <p className="text-gray-600">Complete your purchase in a few easy steps</p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Shipping", icon: FiMapPin },
              { num: 2, label: "Review", icon: FiShoppingBag }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${activeStep >= step.num
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-400 border-2 border-gray-300"
                      }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium ${activeStep >= step.num ? "text-blue-600" : "text-gray-400"
                      }`}
                  >
                    {step.label}
                  </p>
                </div>
                {idx < 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 rounded transition-all ${activeStep > step.num ? "bg-blue-600" : "bg-gray-300"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* STEP 1: Shipping Information */}
              {activeStep === 1 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiMapPin className="text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            {...register("fullName", {
                              required: "Full name is required",
                              minLength: { value: 2, message: "Name must be at least 2 characters" }
                            })}
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-200'
                              }`}
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          })}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'
                            }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[\d\s\-\+\(\)]+$/,
                            message: "Invalid phone number"
                          }
                        })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200'
                          }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        {...register("address", {
                          required: "Address is required",
                          minLength: { value: 5, message: "Address must be at least 5 characters" }
                        })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.address ? 'border-red-500' : 'border-gray-200'
                          }`}
                        placeholder="123 Main Street"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          {...register("city", { required: "City is required" })}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.city ? 'border-red-500' : 'border-gray-200'
                            }`}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          {...register("zipCode", {
                            required: "ZIP code is required",
                            pattern: {
                              value: /^[0-9]{5}(-[0-9]{4})?$/,
                              message: "Invalid ZIP code"
                            }
                          })}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.zipCode ? 'border-red-500' : 'border-gray-200'
                            }`}
                          placeholder="10001"
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Country *
                        </label>
                        <input
                          type="text"
                          {...register("country", { required: "Country is required" })}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.country ? 'border-red-500' : 'border-gray-200'
                            }`}
                          placeholder="USA"
                        />
                        {errors.country && (
                          <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => canProceedToStep2() && setActiveStep(2)}
                    disabled={!canProceedToStep2()}
                    className={`w-full mt-6 py-4 rounded-xl font-semibold transition-all ${canProceedToStep2()
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    Review Order
                  </button>
                </div>
              )}

              {activeStep === 2 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <FiShoppingBag className="text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Review Your Order</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Shipping To:</h3>
                      <p className="text-gray-600">{formData.fullName}</p>
                      <p className="text-gray-600">{formData.address}</p>
                      <p className="text-gray-600">
                        {formData.city}, {formData.zipCode}, {formData.country}
                      </p>
                      <p className="text-gray-600">{formData.email}</p>
                      <p className="text-gray-600">{formData.phone}</p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                      <div className="flex items-center gap-3">
                        <FiDollarSign className="text-green-600 text-2xl" />
                        <div>
                          <h3 className="font-semibold text-gray-800">Payment Method:</h3>
                          <p className="text-green-700 font-medium">Cash on Delivery</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Pay ${total.toFixed(2)} when your order arrives
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                    >
                      Place Order ${total.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                      />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-2 text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-blue-600 font-semibold">
                        ${(parseFloat(item.price) * parseInt(item.qty)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-700 font-medium">
                    🎉 You've qualified for free shipping!
                  </p>
                </div>
              )}

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <FiDollarSign className="text-blue-600" />
                  <p className="text-sm text-blue-700 font-medium">
                    Cash on Delivery Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}