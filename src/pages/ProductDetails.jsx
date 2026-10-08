import { useParams } from "react-router-dom";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
const productsURL="http://localhost:3000/products"
function ProductDetails(){
    const {id}=useParams();
    const {data:product}=useQuery({
        queryKey:["products",id],
        queryFn:async()=>{
            const response=await axios.get(`${productsURL}/${id}`)
            return response.data;
        }
    })
    if(!product){return <p>Loading...</p>}
    return(
        <div>
    <h1>{product.title}</h1>
    <h2>{product.author}</h2>
    <p>{product.description}</p>
    <p>Category: {product.category}</p>
    <p>₹{product.price}</p>
    <p>Stock: {product.stock}</p>
        </div>
    )
}
export default ProductDetails;