import {useQuery} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getCart,removeFromCart } from "../services/cartService"; 
function Cart(){
    const {data:cart}=useQuery({
        queryKey:["cart"],
        queryFn:getCart
    })
    
    const handleRemove=async(id)=>{
        await removeFromCart(id)
        alert ("Book removed from cart")}
        if(!cart){return <p>Loading...</p>}
    return(
        <div>
            {cart.map((product)=>(
                <div key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.author}</p>
                        <p>₹{product.price}</p>
                        <button onClick={()=>handleRemove(product.id)}>Remove</button>
                </div>
            ))}
            {cart.length > 0 && (
  <Link to="/checkout">
    Proceed to Checkout →
  </Link>
)}
        </div>
    )
}
export default Cart;