import { useQuery } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { getCart, removeFromCart } from "../services/cartService";
import { createOrder } from "../services/orderService";
    function Checkout() {const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const {data: cart,isLoading,isError,} = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
if (isLoading) {
return <p>Loading checkout...</p>;}
if (isError) {
return <p>Could not load your cart.</p>;}
    const total = cart.reduce(
(sum, book) => sum + book.price,0);
    const handlePlaceOrder = async () => {
    if (!user) {navigate("/login");return;}
    if (cart.length === 0) {alert("Your cart is empty.");return;}
try {await createOrder({userId: user.id,
customerName: user.name,
email: user.email,items: cart,total: total,
status: "Placed",
createdAt: new Date().toISOString(),});
await Promise.all(cart.map((book) => removeFromCart(book.id)));
alert("Order placed successfully!");
navigate("/orders");} catch (error) {
console.error(error);
alert("Could not place your order. Please try again.");}};
return (
<div>
<h1>Checkout</h1>
{!user && (
<p>Please <Link to="/login">log in</Link> before placingyour order.</p>)}
<h2>Order Summary</h2>
{cart.length === 0 ? (<p>Your cart is empty.</p>):(<>{cart.map((book) => (<div key={book.id}><h3>{book.title}</h3><p>₹{book.price}</p></div>))}
<h2>Total: ₹{total}</h2>
<button onClick={handlePlaceOrder}>Place Order</button></>)}</div>);
}
export default Checkout;    ``