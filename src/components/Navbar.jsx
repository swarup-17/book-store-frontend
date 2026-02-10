import { Link } from "react-router-dom";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  const token = localStorage.getItem("token");

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm transition-colors duration-300">
      <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center md:gap-8 gap-4">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Book Store
          </Link>
        </div>

        {/* Right Side */}
        <div className="relative flex items-center md:space-x-4 space-x-2">

          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="relative group">
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-8 rounded-full ring-2 transition-all ${currentUser ? "ring-primary group-hover:ring-indigo-600" : "ring-transparent"
                      }`}
                  />
                  <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md z-40 border border-gray-100 animate-fade-in-down">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : token ? (
              <Link
                to="/dashboard"
                className="text-primary font-medium hover:underline"
              >
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full">
                <HiOutlineUser className="size-6 text-gray-800" />
              </Link>
            )}
          </div>

          <Link to="/favorites" className="hidden sm:block p-2 hover:bg-gray-100 rounded-full">
            <HiOutlineHeart className="size-6 text-gray-800" />
          </Link>

          <Link
            to="/cart"
            className="bg-primary hover:bg-indigo-600 text-white p-2 px-4 flex items-center rounded-full transition-colors shadow-md"
          >
            <HiOutlineShoppingCart className="size-5" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold ml-2">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold ml-2">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
