import React, { useState } from "react";
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai';
import styles from "../../styles/styles.js"
import { Link, useNavigate } from "react-router-dom";
import {server} from "../../server.js";
import axios from "axios";
import { toast } from "react-toastify";

const ShopLogin = () => {
 const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post(`${server}/shop/login-shop`, {
      email,
      password,
    },{withCredentials:true}) 
    .then((res) => {
      toast.success("Login Successful");
      navigate("/dashboard")
      
      window.location.reload(true);
     
    })
    .catch((err) => {
       toast.error(err.response.data.message);
   
    });
  } catch (error) {
    console.error(error);
  }
};


    
  return (
    <div className="min-h-screen bg-gr\ flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to Your Shop
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 "
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 "
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible?"text":"password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
               {
                visible?(
                     <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={()=>setVisible(false)}
                />
                ):(
                     <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={()=>setVisible(true)}
                />
                )
               }
              </div>
            </div>

            </div>
<div className={`${styles.normalFlex} justify-between`}>
  <div className={`${styles.normalFlex}`}>
    <input
      type="checkbox"
      name="remember-me"
      id="remember-me"
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
      Remember Me
    </label>
  </div>
  <div className="text-sm">
  <a href=".forgot-password" className="font-medium text-blue-600 hover:text-blue-500 ">Forgot your Password?</a>

  </div>
</div>  
<div>
    <button type="submit" className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ">
        Submit
    </button>
</div>    
<div className={`${styles.normalFlex} w-full`}>
    <h4>Not have any account?</h4>
    <Link to='/shop-create' className="text-blue-600 pl-2">Sign Up</Link>
</div>     
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;
