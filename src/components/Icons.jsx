import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Icons() {
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center gap-2 cursor-pointer">
      <div className="realive">
        {items.length >= 1 && (
          <span className="absolute top-1 right-10 text-sm border-2 text-center rounded-full px-1 text-white bg-primary">
            {items.length}
          </span>
        )}
        <HiOutlineShoppingCart
          onClick={() => navigate("/cart")}
          className="ml-4 text-2xl"
        />
      </div>
      <HiOutlineHeart className="text-2xl mr-4" />
    </div>
  );
}
