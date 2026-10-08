 import {useQuery} from "@tanstack/react-query";
 import { getProducts } from "../services/productService";
 function Products(){
    const {data:products}=useQuery({
        queryKey:["products"],
        queryFn:getProducts
    })
    return(
        <div>
            {products?.map((product)=>(
                <div key= {product.id}>
                    <h2>{product.title}</h2>
                    <p>{product.author}</p>
                    <p>{product.price}</p>
                </div>
            ))}


        </div>
    )
 }
 export default Products;