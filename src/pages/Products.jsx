import "./Products.css";
import {useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {getProducts} from "../services/productService";
import {setProducts} from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";
function Products(){
const dispatch=useDispatch();
const savedProducts=useSelector((state)=>state.products)||[];
const[search,setSearch]=useState("");
const[category,setCategory]=useState("All");
const[sortOrder,setSortOrder]=useState("default");
const filteredProducts=savedProducts.filter((book)=>{
const title=(book.title||book.name||"").toLowerCase();
const author=(book.author||"").toLowerCase();
const matchesSearch=title.includes(search.toLowerCase())||author.includes(search.toLowerCase());
const matchesCategory=category==="All"||book.category===category;
return matchesSearch&&matchesCategory;
});
const sortedProducts=[...filteredProducts].sort((a,b)=>{
if(sortOrder==="lowToHigh")return Number(a.price||0)-Number(b.price||0);
if(sortOrder==="highToLow")return Number(b.price||0)-Number(a.price||0);
return 0;
});
const{data:products,isLoading,isError}=useQuery({queryKey:["products"],queryFn:getProducts});
useEffect(()=>{
if(products)dispatch(setProducts(products));
},[products,dispatch]);
if(isLoading)return <p className="p-6">Loading books...</p>;
if(isError)return <p className="p-6">Failed to load books. Please try again.</p>;
return(
<div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
<input className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" type="text" placeholder="Search books by title or author..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
<select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3" value={category} onChange={(e)=>setCategory(e.target.value)}>
<option value="All">All Categories</option>
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
<select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3" value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)}>
<option value="default">Default Order</option>
<option value="lowToHigh">Price: Low to High</option>
<option value="highToLow">Price: High to Low</option>
</select>
</div>
<div className="product-grid">
{sortedProducts.length>0?sortedProducts.map((product)=><ProductCard key={product.id} product={product}/>):<p className="col-span-full py-10 text-center text-gray-500">No books found.</p>}
</div>
</div>
);
}
export default Products;