import React, { useContext, useEffect, useState } from 'react'
import { API } from '../api/authApi'
import ProductCard from '../components/ProductCard'
import { MyContext } from '../context/AuthContext'

const Products = () => {

 const [products,setProducts] = useState(null)
 const {accessToken} = useContext(MyContext)

 const getAllProducts = async()=>{
  let response = await API.get("/products")
  const allProducts = response.data.data
  setProducts(allProducts)
 }

const deleteProduct =async (id)=>{
   await API.delete(`/products/${id}`,{headers:{
    Authorization:`Bearer ${accessToken}`
   }})
   getAllProducts()
}

 useEffect(()=>{
  getAllProducts()
 },[])

  return (
   <div className="min-h-screen bg-gray-100 p-6">
  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {products?.map((elem) => (
      <ProductCard key={elem._id} product={elem} deleteProduct={deleteProduct} />
    ))}
  </div>
</div>
  )
}

export default Products
