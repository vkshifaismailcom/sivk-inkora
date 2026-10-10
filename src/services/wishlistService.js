import axios from "axios";
const wishlistURL="http://localhost:3000/wishlist";
export const getWishlist=async()=>{
    const response=await axios.get(wishlistURL);
    return response.data;
};
export const addToWishlist=async(book)=>{
    const response=await axios.post(wishlistURL,book);
    return response.data;
};
export const removeFromWishlist=async(id)=>{
    const response=await axios.delete(`${wishlistURL}/${id}`);
    return response.data;
};