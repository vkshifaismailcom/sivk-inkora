import {useQuery,useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {getWishlist,removeFromWishlist} from "../services/wishlistService";
function Wishlist(){
    const queryClient=useQueryClient();
    const {data:wishlist=[],isLoading,isError}=useQuery({queryKey:["wishlist"],queryFn:getWishlist});
    const handleRemove=async(id)=>{
        await removeFromWishlist(id);
        queryClient.invalidateQueries({queryKey:["wishlist"]});
    }
    if(isLoading){return <p>Loading wishlist...</p>}
    if(isError){return <p>Failed to load wishlist.</p>}
    return(
        <div>
            <h1>My Wishlist ♡</h1>
            {wishlist.length===0?<p>Your wishlist is empty.</p>:wishlist.map((book)=>(
                <div key={book.id}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>₹{book.price}</p>
                    <Link to={`/products/${book.productId}`}>View Details</Link>
                    <button onClick={()=>handleRemove(book.id)}>Remove</button>
                </div>
            ))}
        </div>
    )
}
export default Wishlist;