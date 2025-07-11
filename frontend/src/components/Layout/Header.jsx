import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";


const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);//seller authentication login or not
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.product);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = allProducts?.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filtered);
  };

  return (
    <>
      {/* Desktop Header */}
      <div className={`${styles.section}`}>
        <div className="hidden 800px:flex items-center justify-between my-[20px] h-[50px]">
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="logo"
            />
          </Link>

          {/* Search Box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm || ""}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData?.length > 0 && (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm z-[50] p-4 w-full">
                {searchData.map((item) => (
                  <Link to={`/product/${item._id}`} key={item._id}>
                    <div className="w-full flex items-center py-3">
                      <img
                        src={item.images[0]?.url}
                        alt="product"
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <h1>{item.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Become Seller */}
          <div className={`${styles.button}`}>
            <Link to={isSeller ? "/dashboard" : "/shop-create"}>
              <h1 className="text-white flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div className={`${styles.section} flex justify-between items-center`}>
          {/* Categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button className="h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
              />
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>

          {/* Navbar Items */}
          <Navbar active={activeHeading} />

          {/* Icons */}
          <div className="flex items-center">
            <div className="relative cursor-pointer mr-4" onClick={() => setOpenWishlist(true)}>
              <AiOutlineHeart size={30} color="#ffffffd3" />
              <span className="absolute top-0 right-0 bg-[#3bc177] text-white text-[12px] rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist?.length}
              </span>
            </div>

            <div className="relative cursor-pointer mr-4" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} color="#ffffffd3" />
              <span className="absolute top-0 right-0 bg-[#3bc177] text-white text-[12px] rounded-full w-4 h-4 flex items-center justify-center">
                {cart?.length}
              </span>
            </div>

            <div className="relative cursor-pointer">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={`${user?.avatar?.url}`}
                    className="w-[35px] h-[35px] rounded-full"
                    alt="avatar"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} color="#ffffffd3" />
                </Link>
              )}
            </div>
          </div>

          {openCart && <Cart setOpenCart={setOpenCart} />}
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } w-full h-[60px] bg-white shadow-sm 800px:hidden z-50`}
      >
        <div className="w-full flex items-center justify-between px-4">
          <BiMenuAltLeft size={30} onClick={() => setOpen(true)} />
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="logo"
              className="h-[40px]"
            />
          </Link>
          <div className="relative" onClick={() => setOpenCart(true)}>
            <AiOutlineShoppingCart size={30} />
            <span className="absolute -top-1 -right-1 bg-[#3bc177] text-white text-[12px] rounded-full w-4 h-4 flex items-center justify-center">
              {cart?.length}
            </span>
          </div>
        </div>

        {open && (
          <div className="fixed inset-0 bg-[#0000005f] z-20">
            <div className="fixed top-0 left-0 w-[70%] h-screen bg-white z-30 p-4 overflow-y-auto">
              <div className="flex justify-between items-center">
                <div
                  className="relative mr-[15px]"
                  onClick={() => {
                    setOpenWishlist(true);
                    setOpen(false);
                  }}
                >
                  <AiOutlineHeart size={30} />
                  <span className="absolute -top-1 -right-1 bg-[#3bc177] text-white text-[12px] rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist?.length}
                  </span>
                </div>
                <RxCross1 size={30} onClick={() => setOpen(false)} />
              </div>

              <div className="my-6">
                <input
                  type="search"
                  placeholder="Search Product..."
                  value={searchTerm || ""}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-2 border-[#3957db] rounded-md"
                />
                {searchData?.length > 0 && (
                  <div className="absolute bg-white shadow z-50 w-[90%] mt-2 p-3">
                    {searchData.map((item) => (
                      <Link to={`/product/${item._id}`} key={item._id}>
                        <div className="flex items-center mb-2">
                          <img
                            src={item.images[0]?.url}
                            alt=""
                            className="w-[40px] h-[40px] mr-2"
                          />
                          <h5>{item.name}</h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />

              <div className={`${styles.button} mt-4`}>
                <Link to="/shop-create">
                  <h1 className="text-white flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>

              <div className="mt-8 flex justify-center">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      alt=""
                      className="w-[60px] h-[60px] rounded-full border-2 border-[#0eae88]"
                    />
                  </Link>
                ) : (
                  <div className="text-center">
                    <Link to="/login" className="text-[18px] mr-2 text-gray-700">
                      Login /
                    </Link>
                    <Link to="/sign-up" className="text-[18px] text-gray-700">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
