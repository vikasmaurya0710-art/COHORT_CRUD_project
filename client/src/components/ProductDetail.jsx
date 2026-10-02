import React from "react";
import { useLocation, useNavigate } from "react-router";

const ProductDetail = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state?.singleProduct


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <button onClick={()=>navigate("/dashboard")} className="mb-6 flex items-center gap-2 rounded-lg bg-gray-800 px-5 py-2.5 font-medium text-white transition hover:bg-gray-700">
          ← Back
        </button>

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="h-full min-h-100 bg-gray-100">
              <img
                src={product?.imageUrl}
                alt={product?.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Product Details
              </p>

              <h1 className="mb-5 text-3xl font-bold text-gray-900 md:text-4xl">
                {product?.title || "Product Title"}
              </h1>

              <p className="mb-6 leading-7 text-gray-600">
                {product?.description || "Product description goes here."}
              </p>

              <div className="mb-8">
                <p className="text-sm font-medium text-gray-500">Price</p>
                <p className="mt-1 text-3xl font-bold text-green-600">
                  ₹{product?.price || 0}
                </p>
              </div>

              <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;