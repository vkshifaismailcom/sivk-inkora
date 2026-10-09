 import {useEffect} from "react";
 import {useDispatch,useSelector} from "react-redux";
 import {useQuery} from "@tanstack/react-query";
 import { getProducts } from "../services/productService";
 import { setProducts } from "../redux/slices/productSlice";
 import ProductCard from "../components/ProductCard";
 function Products(){
    const dispatch=useDispatch();
    const savedProducts=useSelector((state)=>state.products)
    const {data:products,isLoading,isError}=useQuery({
        queryKey:["products"],
        queryFn:getProducts
    })
    useEffect(()=>{
    if(products){dispatch(setProducts(products))}
    }),[products,dispatch]
    if(isLoading){return <p>Loading books...</p>}
    if(isError){return <p>Failed to load books. Please try again</p>}


    return(
        <div>
            {savedProducts?.map((product)=>(
                
                    <ProductCard key={product.id} product={product} />
               
            ))}


        </div>
    )
 }
 export default Products;