import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ product , deleteProduct }) => {

const navigate = useNavigate()

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg">
      <img onClick={()=>navigate(`/single/${product._id}`,{state:{
        singleProduct:product
      }})}
        src={product.imageUrl}
        alt={product.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          {product.title}
        </h2>

        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {product.description}
        </p>

        <p className="mb-5 text-lg font-bold text-green-600">
          ₹{product.price}
        </p>

        <div  className="flex gap-3">
          <button onClick={()=>navigate("/dashboard/create",{
            state:{
              product:product
            }
          })} className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700">
            Update
          </button>

          <button onClick={()=>deleteProduct(product._id)}  className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
