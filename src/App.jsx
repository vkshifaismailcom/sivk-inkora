import {Link} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App(){
return(
<>

<nav className="flex flex-wrap items-center gap-4 border-b border-gray-300 bg-white px-6 py-5 shadow-sm">
<Link className="font-bold text-gray-900" to="/">INKORA</Link>
<Link className="font-medium text-gray-700" to="/">Home</Link>
<Link className="font-medium text-gray-700" to="/products">Books</Link>
<Link className="font-medium text-gray-700" to="/cart">My Cart 🛒</Link>
<Link className="font-medium text-gray-700" to="/wishlist">Wishlist ♡</Link>
<Link className="font-medium text-gray-700" to="/account">My Account</Link>
</nav>

<AppRoutes/>
</>
);
}

export default App;
