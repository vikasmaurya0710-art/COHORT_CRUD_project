import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { API } from "../api/authApi";
import { MyContext } from "../context/AuthContext";

const LoginPage = () => {

  const navigate = useNavigate()
  const {setAccessToken,accessToken} = useContext(MyContext)
  const {register,reset,handleSubmit,formState:{errors}} = useForm()
console.log(accessToken)


  const loginSubmit = async (data)=>{

    let response = await API.post("/auth/login",data)
    const Token = response.data.data.accessToken
    localStorage.setItem("accessToken",Token)
    setAccessToken(Token)
    navigate("/dashboard")

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleSubmit(loginSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
            {...register("email",{
              required:"email is required"
            })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
{
  errors.email?<h1 className="text-red-500">{errors.email.message}</h1>:""
}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
            {...register("password",{
              required:"password is required",
              minLength:{
                value:6,
                message:"password must be atleast 6 digits"
              }
            })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
{
  errors.password?<h1 className="text-red-500">{errors.password.message}</h1>:""
}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            onClick={()=>navigate("/register")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;