import { Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/products">Books</Link>
        {" | "}
        <Link to="/cart">My Cart 🛒</Link>
        {" | "}
        <Link to="/orders">My orders</Link>
      </nav>

      <AppRoutes />
    </>
  );
}

export default App;