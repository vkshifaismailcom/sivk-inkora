import{Route,Routes} from "react-router-dom";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
function AppRoutes(){
    return(
        <Routes>
<Route path="/" element={<h1>sivk inkora</h1>} />
<Route path="/products" element={<Products/>} />
<Route path="/products/:id" element={<ProductDetails />} />

        </Routes>
    )
}
export default AppRoutes;