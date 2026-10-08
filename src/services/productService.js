import axios from "axios";
const productsURL="http://localhost:3000/products"
export const getProducts=assync()=>{
    const response=await axios.get(productsURL)
    return response.data
}