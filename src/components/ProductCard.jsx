import {useState} from "react";
import {useQuery,useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {getWishlist,addToWishlist,removeFromWishlist} from "../services/wishlistService";
import {addToCart} from "../services/cartService";

function ProductCard({product}){
const queryClient=useQueryClient();
const [addingToCart,setAddingToCart]=useState(false);
const [updatingWishlist,setUpdatingWishlist]=useState(false);

const {data:wishlist=[]}=useQuery({
queryKey:["wishlist"],
queryFn:getWishlist
});

const isWishlisted=wishlist.some(
(book)=>String(book.productId)===String(product.id)
);

const handleAddToCart=async()=>{
try{
setAddingToCart(true);

await addToCart(product);

await queryClient.invalidateQueries({queryKey:["cart"]});

toast.success("Book added to cart!",{
position:"top-right",
autoClose:3000,
theme:"colored"
});
}catch(error){
toast.error(error.message||"Could not add book to cart.",{
position:"top-right",
autoClose:3000,
theme:"colored"
});
}finally{
setAddingToCart(false);
}
};

const handleWishlist=async()=>{
try{
setUpdatingWishlist(true);

if(isWishlisted){
const savedBook=wishlist.find(
(book)=>String(book.productId)===String(product.id)
);

if(savedBook){
await removeFromWishlist(savedBook.id);
}

toast.success("Book removed from wishlist!",{
theme:"colored"
});
}else{
await addToWishlist({
productId:product.id,
title:product.title,
author:product.author,
price:product.price,
category:product.category
});

toast.success("Book added to wishlist!",{
theme:"colored"
});
}

await queryClient.invalidateQueries({queryKey:["wishlist"]});
}catch(error){
toast.error("Could not update wishlist.",{
theme:"colored"
});
}finally{
setUpdatingWishlist(false);
}
};

return(

<div className="flex flex-col rounded-xl border border-gray-300 bg-white p-5 shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl">

<div className="mb-4 flex h-40 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-sm font-medium text-gray-600">
BOOK COVER
</div>

<h2 className="mb-2 text-lg font-bold text-gray-900">
{product.title}
</h2>

<p className="mb-3 text-sm text-gray-700">
{product.author}
</p>

<p className="mb-5 text-xl font-bold text-gray-950">
₹{Number(product.price).toLocaleString("en-IN")}
</p>

<div className="mt-auto flex flex-col gap-3">

<button
type="button"
onClick={handleAddToCart}
disabled={addingToCart}
className="w-full rounded-lg border border-black bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"

>

{addingToCart?"Adding to Cart...":"🛒 Add to Cart"} </button>

<button
type="button"
onClick={handleWishlist}
disabled={updatingWishlist}
className="w-full rounded-lg border border-gray-400 bg-white px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"

>

{updatingWishlist?"Updating...":isWishlisted?"♥ Remove from Wishlist":"♡ Add to Wishlist"} </button>

<Link
to={`/products/${product.id}`}
className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-center font-semibold text-gray-900 hover:bg-gray-200"
>
View Details
</Link>

</div>
</div>
);
}

export default ProductCard;
