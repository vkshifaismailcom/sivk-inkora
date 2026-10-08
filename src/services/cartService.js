import axios from "axios";
const cartURL ="http://localhost:3000/cart";
export const getCart=async()=>{
    const response=await axios.get(cartURL)
    return response.data
}
export const addToCart=async(product)=>{
    const response=await axios.post(cartURL,product)
    return response.data
}
export const removeFromCart=async(id)=>{
    const response=await axios.delete(`${cartURL}/${id}`)
return response.data
}