import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { API } from "../api/authApi";
import { MyContext } from "../context/AuthContext";

const Create = () => {
  const { accessToken} = useContext(MyContext);
  const location = useLocation();
  const user = location.state?.product
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      title:user?.title,
      description:user?.description,
      price:user?.price,
      imageUrl:user?.imageUrl
    }
  });
  const navigate = useNavigate();

  const createProduct = async (data) => {
    if (location.state?.product) {
      const user = location.state.product;
      await API.put(`/products/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else {
      await API.post("/products", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Create Product</h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-600 transition hover:bg-red-500 hover:text-white"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(createProduct)} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title", {
                required: true,
                minLength: {
                  value: 2,
                  message: "atleast 2 characters required for title",
                },
                maxLength: {
                  value: 20,
                  message: "atmost 20 characters allowed for title",
                },
              })}
              type="text"
              placeholder="Enter product title"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          {errors.title ? (
            <h1 className="text-red-500">{errors.title.message}</h1>
          ) : (
            ""
          )}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", {
                required: true,
                minLength: {
                  value: 20,
                  message: "atleast 20 characters required for description",
                },
                maxLength: {
                  value: 200,
                  message: "atmost 200 characters allowed for description",
                },
              })}
              rows="4"
              placeholder="Enter product description"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          {errors.description ? (
            <h1 className="text-red-500">{errors.description.message}</h1>
          ) : (
            ""
          )}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Price
            </label>
            <input
              {...register("price", {
                required: true,
                min: {
                  value: 1,
                  message: "Price must be atleast 1rupee",
                },
              })}
              type="number"
              placeholder="Enter product price"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          {errors.price ? (
            <h1 className="text-red-500">{errors.price.message}</h1>
          ) : (
            ""
          )}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Image URL
            </label>
            <input
              {...register("imageUrl", {
                required: true,
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Enter a valid URL",
                },
              })}
              type="url"
              placeholder="Enter image URL"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          {errors.imageUrl ? (
            <h1 className="text-red-500">{errors.imageUrl.message}</h1>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {location.state?.product ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
