 import {useEffect,useState} from "react";
 import {useDispatch,useSelector} from "react-redux";
 import {useQuery} from "@tanstack/react-query";
 import { getProducts } from "../services/productService";
 import { setProducts } from "../redux/slices/productSlice";
 import ProductCard from "../components/ProductCard";
 function Products(){
    const dispatch=useDispatch();
    const savedProducts=useSelector((state)=>state.products)
    const[search,setSearch]=useState("");
    const[category,setCategory]=useState("All");
    const[sortOrder, setSortOrder]=useState("default");
    const filteredProducts=savedProducts.filter((note)=>{
        const matchesSearch=note.title.toLowerCase().includes(search.toLowerCase())||note.author.toLowerCase().includes(search.toLowerCase())
        const matchesCategory=category==="All"||note.category===category;
        return matchesSearch&&matchesCategory
    })               
    const sortedProducts=[...filteredProducts].sort((a,b)=>{
        if(sortOrder==="lowToHigh"){return a.price-b.price}
        if(sortOrder==="highToLow"){return b.price-a.price}
        return 0;
    })                                                                                                                                                
    const {data:products,isLoading,isError}=useQuery({
        queryKey:["products"],
        queryFn:getProducts})
    useEffect(()=>{
    if(products){dispatch(setProducts(products))}
    },[products,dispatch])
    if(isLoading){return <p>Loading books...</p>}
    if(isError){return <p>Failed to load books. Please try again</p>}


    return(
        <div>
            <input type="text" placeholder="Search books by title or author..." value={search}onChange={((e)=>setSearch(e.target.value))} />
            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="All">All category</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
            <option value="Mystery">Mystery</option>
            <option value="Tragedy">Tragedy</option>
            <option value="Psychology">Psychology</option>
            <option value="Self Help">Self Help</option>
            <option value="Finance">Finance</option>
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>

            </select>
            <select value={sortOrder} onChange={((e)=>setSortOrder(e.target.value))}>
                <option value="default">Default Order</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
            </select>
            {sortedProducts.map((product)=>(
                
                    <ProductCard key={product.id} product={product} />
               
            ))}


        </div>
    )
 }
 export default Products;