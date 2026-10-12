import {useQuery,useQueryClient} from "@tanstack/react-query";
import {Link,useNavigate} from "react-router-dom";
import {getOrders,cancelOrder} from "../services/orderService";
import {toast} from "react-toastify";

function Account(){
const navigate=useNavigate();
const queryClient=useQueryClient();
const user=JSON.parse(localStorage.getItem("user")||"null");

const {data:orders=[],isLoading,isError}=useQuery({
queryKey:["orders",user?.id],
queryFn:()=>getOrders(user.id),
enabled:Boolean(user)
});

const handleCancel=async(order)=>{
if(order.status==="Cancelled"){toast.warning("This order is already cancelled.");return;}
if(!window.confirm("Are you sure you want to cancel this order?"))return;
try{
await cancelOrder(order.id);
await queryClient.invalidateQueries({queryKey:["orders",user.id]});
toast.success("Order cancelled successfully!");
}catch(error){
console.error(error);
toast.error("Could not cancel the order. Please try again.");
}
};

const handleLogout=()=>{
localStorage.removeItem("user");
queryClient.clear();
toast.success("Logged out successfully!");
navigate("/login");
};

if(!user)return <div><h2>Please login to view your account.</h2><Link to="/login">Login</Link>{" | "}<Link to="/register">Register</Link></div>;
if(isLoading)return <p>Loading your account...</p>;
if(isError)return <p>Could not load your account. Please try again.</p>;

return(
<div>
<h1>My Account</h1>
<p><strong>Name:</strong> {user.name}</p>
<p><strong>Email:</strong> {user.email}</p>
<button onClick={handleLogout}>Logout</button>
<hr/>
<h2>My Orders 📦</h2>
{orders.length===0?<p>You haven't placed any orders yet.</p>:orders.map(order=>(
<div key={order.id}>
<hr/>
<h3>Order #{order.id}</h3>
<p>Status: {order.status}</p>
<p>Date: {order.createdAt?new Date(order.createdAt).toLocaleString():"Date unavailable"}</p>
{(order.items||[]).map((book,index)=>(
<div key={book.id||book.productId||index}>
<p><strong>{book.title}</strong></p>
<p>Author: {book.author||"Not available"}</p>
<p>Price: ₹{Number(book.price)}</p>
<p>Quantity: {Number(book.quantity||1)}</p>
<p>Subtotal: ₹{Number(book.price)*Number(book.quantity||1)}</p>
</div>
))}
<h3>Total: ₹{Number(order.total)}</h3>
{order.status!=="Cancelled"&&<button onClick={()=>handleCancel(order)}>Cancel Order</button>}
</div>
))}
</div>
);
}

export default Account;