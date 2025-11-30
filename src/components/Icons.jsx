import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";

export default function Icons() {
    return (
        <div className="flex justify-between items-center gap-2 cursor-pointer">
            <HiOutlineShoppingCart className="ml-4 text-2xl" />
            <HiOutlineHeart className="text-2xl mr-4" />
        </div>
    )
}