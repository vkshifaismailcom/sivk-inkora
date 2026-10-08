import{Route,Routes} from "react-router-dom";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
function AppRoutes(){
    return(
        <Routes>
<Route path="/" element={<h1>sivk inkora</h1>} />
<Route path="/products" element={<Products/>} />
<Route path="/products/:id" element={<ProductDetails />} />
<Route path="/cart" element={<Cart />} />


        </Routes>
    )
}
export default AppRoutes;