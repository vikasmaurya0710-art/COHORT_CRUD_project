import React from "react";
import { useLocation } from "react-router";

const GetMe = () => {

const location = useLocation()
const user = location.state?.user

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-bold text-blue-600 shadow-lg">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h1 className="mt-4 text-2xl font-bold text-white">
            {user?.name || "User"}
          </h1>

          <p className="mt-1 text-sm text-blue-100">My Profile</p>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">Name</p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
              {user?.name || "Not available"}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">Email</p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
              {user?.email || "Not available"}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">Password</p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 tracking-widest text-gray-500">
              ••••••••••••
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetMe;