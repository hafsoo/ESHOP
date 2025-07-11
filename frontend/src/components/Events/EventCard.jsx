import React from "react";
//import styles from "..//styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "mb-6" : "mb-12"
      } lg:flex p-2 mt-5`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={data.images[0]?.url}
          alt={data.name}
          className="w-full h-[350px] object-cover rounded-xl border"
        />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center px-6 pt-4 lg:pt-0">
        <h2 className="text-[26px] font-semibold text-gray-800 mb-2">
          {data.name}
        </h2>
        <p className="text-gray-600 leading-6 mb-3">{data.description}</p>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <h5 className="text-[18px] font-medium text-red-500 line-through">
              ${data.originalPrice}
            </h5>
            <h5 className="text-[20px] font-bold text-gray-800">
              ${data.discountPrice}
            </h5>
          </div>
          <span className="text-[16px] font-medium text-green-600">
            {data.sold_out} sold
          </span>
        </div>

        <CountDown data={data} />
        <div className="flex items-center gap-4 mt-6">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md font-medium transition duration-300">
              See Details
            </div>
          </Link>
          <button
            onClick={() => addToCartHandler(data)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-md font-medium transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
