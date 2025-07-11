//import { useSelector } from "react-redux";
//import { Navigate } from "react-router-dom";
//import Loader from "../components/Layout/Loader";

//const SellerProtectedRoute = ({ children }) => {
  //const { isLoading, isSeller} = useSelector((state) => state.seller);

  //if (isLoading === true) {
    //return <Loader/>;
  //}else{
    //if (!isSeller) {
      //return <Navigate to={`/shop-login`} replace />;
    //}
    //return children;
  //}
//};

//export default SellerProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import { useEffect, useState } from "react";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // show loader for 2 seconds minimum

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showLoader) {
    return <Loader />;
  }

  if (!isSeller) {
    return <Navigate to="/shop-login" replace />;
  }

  return children;
};

export default SellerProtectedRoute;
