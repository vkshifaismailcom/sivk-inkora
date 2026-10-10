import axios from "axios";
const cartURL="http://localhost:3000/cart";
export const getCart=async()=>{
const user=JSON.parse(localStorage.getItem("user")||"null");
if(!user){return []}
const response=await axios.get(`${cartURL}?userId=${user.id}`);
return response.data;
};
export const addToCart=async(product)=>{
const user=JSON.parse(localStorage.getItem("user")||"null");
if(!user){throw new Error("Please log in first")}
const response=await axios.get(`${cartURL}?userId=${user.id}`);
const existingBook=response.data.find((book)=>String(book.productId||book.id)===String(product.id));
if(existingBook){
const quantity=Number(existingBook.quantity||1)+1;
const updated=await axios.patch(`${cartURL}/${existingBook.id}`,{quantity});
return updated.data;
}
const cartItem={
productId:product.id,
title:product.title,
author:product.author,
price:Number(product.price),
category:product.category,
description:product.description,
stock:product.stock,
quantity:1,
userId:user.id
};
const result=await axios.post(cartURL,cartItem);
return result.data;
};
export const updateCartQuantity=async(id,quantity)=>{
if(quantity<1){return removeFromCart(id)}
const response=await axios.patch(`${cartURL}/${id}`,{quantity});
return response.data;
};
export const removeFromCart=async(id)=>{
const response=await axios.delete(`${cartURL}/${id}`);
return response.data;
};