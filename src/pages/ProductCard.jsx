import {useMutation,useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {addCartItem} from "../services/cartService";
import "./ProductCard.css";
function ProductCard({product}){
const queryClient=useQueryClient();
const title=product.title||product.name||"Untitled Book";
const image=product.image||product.cover||product.thumbnail;
const addToCartMutation=useMutation({
mutationFn:()=>addCartItem(product),
onSuccess:()=>{
queryClient.invalidateQueries({queryKey:["cart"]});
toast.success("Book added to your cart!");
},
onError:()=>{
toast.error("Unable to add the book. Check whether JSON Server is running and the cart resource exists.");
}
});
const outOfStock=product.stock!==undefined&&Number(product.stock)<=0;
return(<article className="product-card">
<Link to={`/products/${product.id}`} className="product-card-image-link" aria-label={`View ${title} details`}>
<div className="product-card-image">
{image?<img src={image} alt={title} loading="lazy" onError={(event)=>{event.currentTarget.style.display="none";}}/>:<div className="product-card-placeholder">INKORA</div>}
{product.category&&<span className="product-card-category">{product.category}</span>}
</div>
</Link>
<div className="product-card-content">
<p className="product-card-author">{product.author||"Unknown Author"}</p>
<h3 className="product-card-title">{title}</h3>
<p className="product-card-price">₹{Number(product.price||0).toLocaleString("en-IN")}</p>
<div className="product-card-actions">
<Link to={`/products/${product.id}`} className="product-card-details">VIEW DETAILS ↗</Link>
<button type="button" className="product-card-cart" onClick={()=>addToCartMutation.mutate()} disabled={addToCartMutation.isPending||outOfStock}>{outOfStock?"OUT OF STOCK":addToCartMutation.isPending?"ADDING...":"ADD TO CART +"}</button>
</div>
</div>
</article>)
}
export default ProductCard;