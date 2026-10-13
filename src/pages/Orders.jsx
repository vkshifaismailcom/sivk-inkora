import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {getOrders,cancelOrder} from "../services/orderService";

function Orders(){
const user=JSON.parse(localStorage.getItem("user")||"null");

const queryClient=useQueryClient();

const {data:orders=[],isLoading,isError}=useQuery({
queryKey:["orders",user?.id],
queryFn:()=>getOrders(user.id),
enabled:Boolean(user)
});

const cancelMutation=useMutation({
mutationFn:cancelOrder,
onSuccess:()=>{
queryClient.invalidateQueries({queryKey:["orders",user?.id]});
}
});

if(!user){
return <p>Please <Link to="/login">log in</Link> to view your orders.</p>;
}

if(isLoading){
return <p>Loading your orders...</p>;
}

if(isError){
return <p>Could not load your orders.</p>;
}

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

{order.status!=="Cancelled"&&(
<button
type="button"
onClick={()=>cancelMutation.mutate(order.id)}
disabled={cancelMutation.isPending}
style={{
backgroundColor:"#b91c1c",
color:"#ffffff",
padding:"10px 18px",
border:"none",
borderRadius:"8px",
cursor:cancelMutation.isPending?"not-allowed":"pointer",
fontWeight:"600",
marginTop:"10px",
opacity:cancelMutation.isPending?0.6:1
}}

>

{cancelMutation.isPending?"Cancelling...":"Cancel Order"} </button>
)}

</div>
))}
</div>
);
}

export default Orders;
