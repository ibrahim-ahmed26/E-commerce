import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaBox, FaUserPlus } from "react-icons/fa";

export default function Navigation() {
  return (
    <div
      className="
        flex justify-between px-4 py-4 items-center gap-2 
        cursor-pointer md:flex-1"
    >
      <h3 className="md:text-3xl font-bold">Exclusive</h3>

      <ul className="flex justify-between items-center gap-4">
        {/* HOME */}
        <li className="relative group px-2">
          <Link
            to="/"
            className="before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-primary before:transition-all group-hover:before:w-full"
          >
            <FaHome className="text-xl block md:hidden" />
            <span className="hidden md:block">Home</span>
          </Link>
        </li>

        {/* PRODUCTS */}
        <li className="relative group px-2">
          <Link
            to="/products"
            className="before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-primary before:transition-all group-hover:before:w-full"
          >
            <FaBox className="text-xl block md:hidden" />
            <span className="hidden md:block">Products</span>
          </Link>
        </li>

        {/* CART */}
        <li className="relative group px-2">
          <Link
            to="/cart"
            className="before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-primary before:transition-all group-hover:before:w-full"
          >
            <FaShoppingCart className="text-xl block md:hidden" />
            <span className="hidden md:block">Cart</span>
          </Link>
        </li>

        {/* SIGN UP */}
        <li className="relative group px-2">
          <Link
            to="/signup"
            className="before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-primary before:transition-all group-hover:before:w-full"
          >
            <FaUserPlus className="text-xl block md:hidden" />
            <span className="hidden md:block">Sign Up</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
