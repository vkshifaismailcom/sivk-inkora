 import {useQuery} from "@tanstack/react-query";
 import { getProducts } from "../services/productService";
 import ProductCard from "../components/ProductCard";
 function Products(){
    const {data:products}=useQuery({
        queryKey:["products"],
        queryFn:getProducts
    })
    return(
        <div>
            {products?.map((product)=>(
                
                    <ProductCard key={product.id} product={product} />
               
            ))}


        </div>
    )
 }
 export default Products;