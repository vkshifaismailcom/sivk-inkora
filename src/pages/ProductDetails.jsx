import { useParams } from "react-router-dom";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import { addToCart } from "../services/cartService";
import {getWishlist,addToWishlist} from "../services/wishlistService";
import { toast } from "react-toastify";
const productsURL="http://localhost:3000/products"
function ProductDetails(){
    const {id}=useParams();
    const {data:product}=useQuery({
        queryKey:["products",id],
        queryFn:async()=>{
            const response=await axios.get(`${productsURL}/${id}`)
            return response.data;
        }
    })
    if(!product){return <p>Loading...</p>}
    const handleAddToCart =async()=>{
        try{
            await addToCart(product)
            toast.success("Book added to cart!");
        }catch(error){
            console.error(error);
            toast.error(error.message || "Could not add the book to cart.");
        }
    }
    const handleAddToWishlist=async()=>{
        try{
            const wishlist=await getWishlist();
            const existingBook=wishlist.find(book=>String(book.productId)===String(product.id));
            if(existingBook){toast.warning("This book is already in your wishlist.");return;}
            await addToWishlist({productId:product.id,title:product.title,author:product.author,price:product.price,category:product.category,description:product.description,stock:product.stock});
            toast.success("Book added to wishlist!");
        }catch(error){
            console.error(error);
            toast.error("Could not add the book to your wishlist.");
        }
    };
    return(
        <div>
            <h1>{product.title}</h1>
            <h2>{product.author}</h2>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>₹{product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={handleAddToWishlist}>♡ Add to Wishlist</button>
            <button onClick={handleAddToCart}>Add To Cart</button>
        </div>
    )
}
export default ProductDetails;