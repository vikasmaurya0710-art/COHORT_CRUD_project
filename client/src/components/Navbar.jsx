import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyContext } from "../context/AuthContext";
import { API } from "../api/authApi";

const Navbar = () => {

const navigate = useNavigate()
const {accessToken,setAccessToken} = useContext(MyContext)

const getMe = async()=>{
  let response =  await API.get("/auth/me",{headers:{
    Authorization:`Bearer ${accessToken}`
   }})
   const user = response.data.data
   navigate("/dashboard/getMe",{state:{
    user:user
   }})
  }
const logout =async ()=>{
   setAccessToken(null)
   localStorage.removeItem("accessToken")
   await API.post("/auth/logout")
   navigate("/")

}

  return (
    <nav className="rounded-xl flex items-center justify-between bg-orange-600 px-6 py-4 text-white shadow-md">
      <h1 className="text-xl font-bold">My Store</h1>

      <div className="flex items-center gap-3">
  <button onClick={getMe} className="rounded-lg bg-blue-800 px-4 py-2 font-medium transition hover:bg-blue-600">
          User
        </button>

        <button onClick={()=>navigate("/dashboard/create")} className="rounded-lg bg-green-600 px-4 py-2 font-medium transition hover:bg-green-700">
          Create
        </button>

        <button onClick={logout} className="rounded-lg bg-red-800 px-4 py-2 font-medium transition hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
};


export default Navbar;