import{useState} from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
function Register(){
    const navigate=useNavigate();
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const handleRegister=async(e)=>{e.preventDefault();
        try{
            const response=await axios.get("http://localhost:3000/users")
            const existingUser=response.data.find((user)=>
                user.email.toLowerCase()===email.toLowerCase()
            )
            if(existingUser){alert("This email is already registered.");return}
            const newUserResponse=await axios.post("http://localhost:3000/users",
                {name,email,password}
            )
            const newUser = newUserResponse.data;

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        })
      );
      alert("Registration successful!")
      navigate("/");
        } catch (error) {
      alert("Registration failed. Please try again.");
      console.error(error);
    }
  };
  return(
    <div>
        <h1>Create Your Account</h1>
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Full name" value={name} onChange={((e)=>setName(e.target.value))} required/>
            <input type="email" placeholder="Email address" value={email} onChange={((e)=>setEmail(e.target.value))} required/>
            <input type="password" placeholder="Password" value={password} onChange={((e)=>setPassword(e.target.value))} required minLength={6}/>
        <button type="submit">Register</button>
        </form>
          <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
    }
export default Register;