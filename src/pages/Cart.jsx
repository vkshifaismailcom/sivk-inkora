import {useQuery,useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {getCart,removeFromCart,updateCartQuantity} from "../services/cartService";
function Cart(){
const queryClient=useQueryClient();
const user=JSON.parse(localStorage.getItem("user")||"null");
const {data:cart=[],isLoading,isError}=useQuery({
queryKey:["cart",user?.id],
queryFn:getCart
});
const refreshCart=async()=>{
await queryClient.invalidateQueries({queryKey:["cart",user?.id]});
};
const handleRemove=async(id)=>{
try{
await removeFromCart(id);
await refreshCart();
}catch(error){
alert("Could not remove the book.");
}
};
const handleQuantity=async(book,change)=>{
const quantity=Number(book.quantity||1)+change;
if(quantity<1){
await handleRemove(book.id);
return;
}
if(quantity>Number(book.stock)){
alert("Only "+book.stock+" copies are available.");
return;
}
try{
await updateCartQuantity(book.id,quantity);
await refreshCart();
}catch(error){
alert("Could not update quantity.");
}
};
if(isLoading){return <p>Loading...</p>}
if(isError){return <p>Could not load your cart.</p>}
const total=cart.reduce((sum,book)=>sum+Number(book.price)*Number(book.quantity||1),0);
return(
<div>
<h1>My Cart 🛒</h1>
{!user&&<p>Please <Link to="/login">log in</Link> to view your cart.</p>}
{cart.length===0?<p>Your cart is empty.</p>:cart.map((product)=>(
<div key={product.id}>
<h2>{product.title}</h2>
<p>{product.author}</p>
<p>Price: ₹{product.price}</p>
<p>Quantity:</p>
<button onClick={()=>handleQuantity(product,-1)}>-</button>
<span>{product.quantity||1}</span>
<button onClick={()=>handleQuantity(product,1)}>+</button>
<button onClick={()=>handleRemove(product.id)}>Remove</button>
<p>Subtotal: ₹{Number(product.price)*Number(product.quantity||1)}</p>
</div>
))}
{cart.length>0&&<>
<h2>Total: ₹{total}</h2>
<Link to="/checkout">Proceed to Checkout →</Link>
</>}
</div>
)
}
export default Cart;