import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../src/server";
import { toast } from "react-toastify";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/shop/activation`, {
            activation_token,
          });
 toast.success(res.data.message || "Shop activated!");
  toast.success("🎉 Congratulations! Your shop has been created.");
        } catch (err) {
           toast.error(err.response?.data?.message || "Activation failed");
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
     {error ? (
  <div className="text-center">
    <p className="text-red-500">Your activation link has expired or is invalid!</p>
    <Link to="/shop-create" className="text-blue-600 underline mt-4 block">
      Try again
    </Link>
  </div>
) : (
  <p className="text-green-600">Your account has been created successfully!</p>
)}

    </div>
  );
};

export default SellerActivationPage;
