import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {getOrders} from "../services/orderService";
function Orders(){
const user=JSON.parse(localStorage.getItem("user")||"null");
const {data:orders=[],isLoading,isError}=useQuery({
queryKey:["orders",user?.id],
queryFn:()=>getOrders(user.id),
enabled:Boolean(user)
});
if(!user){
return <p>Please <Link to="/login">log in</Link> to view your orders.</p>;
}
if(isLoading){return <p>Loading your orders...</p>}
if(isError){return <p>Could not load your orders.</p>}
return(
<div>
<h1>My Orders 📦</h1>
{orders.length===0?<p>You haven't placed any orders yet.</p>:orders.map((order)=>(
<div key={order.id}>
<hr/>
<h2>Order #{order.id}</h2>
<p>Customer: {order.customerName}</p>
<p>Email: {order.email}</p>
<p>Status: {order.status}</p>
<p>Date: {order.createdAt?new Date(order.createdAt).toLocaleString():"Date unavailable"}</p>
<h3>Books ordered:</h3>
{(order.items||[]).map((book,index)=>(
<div key={book.id||book.productId||index}>
<p><strong>{book.title}</strong></p>
<p>Author: {book.author||"Not available"}</p>
<p>Price: ₹{Number(book.price)}</p>
<p>Quantity: {Number(book.quantity||1)}</p>
<p>Subtotal: ₹{Number(book.price)*Number(book.quantity||1)}</p>
</div>
))}
<h3>Order Total: ₹{Number(order.total)}</h3>
</div>
))}
</div>
)
}
export default Orders;