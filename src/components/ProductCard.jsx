import {useQuery,useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {getWishlist,addToWishlist,removeFromWishlist} from "../services/wishlistService";
function ProductCard({product}){
    const queryClient=useQueryClient();
    const {data:wishlist=[]}=useQuery({queryKey:["wishlist"],queryFn:getWishlist});
    const isWishlisted=wishlist.some((book)=>book.productId===product.id);
    const handleWishlist=async()=>{
        if(isWishlisted){
            const savedBook=wishlist.find((book)=>book.productId===product.id);
            await removeFromWishlist(savedBook.id);
        }else{
            await addToWishlist({productId:product.id,title:product.title,author:product.author,price:product.price,category:product.category});
        }
        queryClient.invalidateQueries({queryKey:["wishlist"]});
    }
    return(
        <div>
            <div>BOOK COVER</div>
            <h2>{product.title}</h2>
            <p>{product.author}</p>
            <p>₹{product.price}</p>
            <button onClick={handleWishlist}>{isWishlisted?"♥":"♡"}</button>
            <Link to={`/products/${product.id}`}>View Details</Link>
        </div>
    )
}
export default ProductCard;