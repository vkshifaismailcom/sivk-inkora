import {Routes,Route,Navigate,useLocation} from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Orders from "../pages/Orders";
import Wishlist from "../pages/Wishlist";
import Account from "../pages/Account";
import Checkout from "../pages/Checkout";
function GuestRoute({children}){
const user=JSON.parse(localStorage.getItem("user")||"null");
return user?<Navigate to="/" replace/>:children;
}
function ProtectedRoute({children}){
const user=JSON.parse(localStorage.getItem("user")||"null");
const location=useLocation();
return user?children:<Navigate to="/login" replace state={{from:location}}/>;
}
function AppRoutes(){
return(
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/products" element={<Products/>}/>
<Route path="/login" element={<GuestRoute><Login/></GuestRoute>}/>
<Route path="/register" element={<GuestRoute><Register/></GuestRoute>}/>
<Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
<Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
<Route path="/wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
<Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}/>
<Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
<Route path="*" element={<Navigate to="/" replace/>}/>
</Routes>
)
}
export default AppRoutes;