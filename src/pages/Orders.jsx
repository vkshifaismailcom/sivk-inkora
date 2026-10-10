import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/orderService";
function Orders() {
const user = JSON.parse(
    localStorage.getItem("user") || "null");

const {data: orders = [],isLoading,isError,} = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrders(user.id),
    enabled: Boolean(user),
  });

  if (!user) {
    return <p>Please log in to view your orders.</p>;}

  if (isLoading) {
    return <p>Loading your orders...</p>}

  if (isError) {
    return <p>Could not load your orders.</p>;}

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <h2>Order #{order.id}</h2>

            <p>Customer: {order.customerName}</p>

            <p>Total: ₹{order.total}</p>

            <p>Status: {order.status}</p>

            <p>
              Date:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <h3>Books ordered:</h3>

            {order.items.map((book) => (
              <p key={book.id}>
                {book.title} — ₹{book.price}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;