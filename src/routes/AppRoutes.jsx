import{Route,Routes} from "react-router-dom";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Register from "../pages/Register";
import Login from "../pages/Login";
function AppRoutes(){
    return(
        <Routes>
<Route path="/" element={<h1>sivk inkora</h1>} />
<Route path="/products" element={<Products/>} />
<Route path="/products/:id" element={<ProductDetails />} />
<Route path="/cart" element={<Cart />} />
<Route path="/register" element={<Register />} />
<Route path="/login" element={< Login/>}/>

        </Routes>
    )
}
export default AppRoutes;