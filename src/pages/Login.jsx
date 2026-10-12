import {useState} from "react";
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";
import {toast} from "react-toastify";
function Login(){
const navigate=useNavigate();
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[showPassword,setShowPassword]=useState(false);
const handleLogin=async(e)=>{
e.preventDefault();
try{
const response=await axios.get("http://localhost:3000/users");
const user=response.data.find((user)=>user.email.toLowerCase()===email.trim().toLowerCase()&&user.password===password);
if(!user){toast.error("Invalid email or password.");return;}
localStorage.setItem("user",JSON.stringify({id:user.id,name:user.name,email:user.email}));
toast.success("Login successful!");
navigate("/");
}catch(error){
console.error(error);
toast.error("Login failed. Please try again.");
}
}
return(<div><h1>Welcome Back</h1><form onSubmit={handleLogin}><input type="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)}/><input type={showPassword?"text":"password"} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/><button type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?"Hide":"Show"}</button><button type="submit">Login</button></form><p>Don't have an account?<Link to="/register">Register</Link></p></div>)
}
export default Login;