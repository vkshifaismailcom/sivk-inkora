import {Link} from "react-router-dom";
function ProductCard({product}){
return(
    <div>
        <div>BOOK COVER</div>
        <h2>{product.title}</h2>
        <p>{product.author}</p>
        <p>{product.price}</p>
        <Link to={`/products/${product.id}`}>View Details</Link>
    </div>
)
}
export default ProductCard;