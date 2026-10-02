import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { API } from "../api/authApi.jsx";

const RegisterPage = () => {

const {register,handleSubmit,reset,formState:{errors},getValues} = useForm()
const navigate = useNavigate()

const formSubmit = async (data)=>{
  if(data.password!==data.confirmPassword){
    return
  }

  let response = await API.post("/auth/register",data)
 console.log(response)
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Register to get started
        </p>

        <form onSubmit={handleSubmit(formSubmit)}  className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
             {...register("name",{
              required:"name is required"
             }
             )}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  {
    errors.name? <h1 className="text-red-500 p-1">{errors.name.message}</h1>:""
  }
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
            {...register("email",{
              required:"email is required "
            })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  {
    errors.email? <h1 className="text-red-500 p-1">{errors.email.message}</h1>:""
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
                message:"minimum 6 digits password is required"
              }
            })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  {
    errors.password? <h1 className="text-red-500 p-1">{errors.password.message}</h1>:""
  }
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
             {...register("confirmPassword",{
              required:"password is required",
              minLength:{
                value:6,
                message:"minimum 6 digits password is required"
              }
            })}
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
   {
    errors.confirmPassword? <h1 className="text-red-500 p-1">{errors.confirmPassword.message}</h1>:""
  }
  {
    getValues("password")!==getValues("confirmPassword")?<h1 className="text-red-500">Password mismatch</h1>:""
  }
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button onClick={()=>navigate("/")} className="cursor-pointer text-blue-600 font-semibold hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;