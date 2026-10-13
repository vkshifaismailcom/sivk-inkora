import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../services/cartService";
import {
getWishlist,
addToWishlist,
removeFromWishlist,
} from "../services/wishlistService";
import "./ProductCard.css";

function ProductCard({ product }) {
const queryClient = useQueryClient();
const [addingToCart, setAddingToCart] = useState(false);
const [updatingWishlist, setUpdatingWishlist] = useState(false);

const title = product.title || product.name || "Untitled Book";
const image = product.image || product.cover || product.thumbnail;

const { data: wishlist = [] } = useQuery({
queryKey: ["wishlist"],
queryFn: getWishlist,
});

const isWishlisted = wishlist.some(
(book) => String(book.productId) === String(product.id)
);

const handleAddToCart = async () => {
if (addingToCart) return;

```
setAddingToCart(true);

try {
  await addToCart(product);

  toast.success("Book added to cart successfully!");
  queryClient.invalidateQueries({ queryKey: ["cart"] });
} catch (error) {
  console.error("Add to cart failed:", error);
  toast.error(error.message || "Failed to add book to cart.");
} finally {
  setAddingToCart(false);
}
```

};

const handleWishlist = async () => {
if (updatingWishlist) return;

```
setUpdatingWishlist(true);

try {
  if (isWishlisted) {
    const savedBook = wishlist.find(
      (book) => String(book.productId) === String(product.id)
    );

    if (savedBook) {
      await removeFromWishlist(savedBook.id);
    }

    toast.info("Book removed from wishlist.");
  } else {
    await addToWishlist({
      productId: product.id,
      title,
      author: product.author,
      price: product.price,
      category: product.category,
    });

    toast.success("Book added to wishlist successfully!");
  }

  await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
} catch (error) {
  console.error("Wishlist update failed:", error);
  toast.error("Failed to update wishlist.");
} finally {
  setUpdatingWishlist(false);
}
```

};

const outOfStock =
product.stock !== undefined && Number(product.stock) <= 0;

return ( <article className="product-card">
<Link
to={`/products/${product.id}`}
className="product-card-image-link"
aria-label={`View ${title} details`}
> <div className="product-card-image">
{image ? (
<img
src={image}
alt={title}
loading="lazy"
onError={(event) => {
event.currentTarget.style.display = "none";
}}
/>
) : ( <div className="product-card-placeholder">INKORA</div>
)}


      {product.category && (
        <span className="product-card-category">
          {product.category}
        </span>
      )}
    </div>
  </Link>

  <div className="product-card-content">
    <p className="product-card-author">
      {product.author || "Unknown Author"}
    </p>

    <h3 className="product-card-title">{title}</h3>

    <p className="product-card-price">
      ₹{Number(product.price || 0).toLocaleString("en-IN")}
    </p>

    <div className="product-card-actions">
      <Link
        to={`/products/${product.id}`}
        className="product-card-details"
      >
        VIEW DETAILS ↗
      </Link>

      <button
        type="button"
        className="product-card-add"
        onClick={handleAddToCart}
        disabled={addingToCart || outOfStock}
      >
        {outOfStock
          ? "OUT OF STOCK"
          : addingToCart
          ? "ADDING TO CART..."
          : "ADD TO CART"}
      </button>

      <button
        type="button"
        className="product-card-wishlist"
        onClick={handleWishlist}
        disabled={updatingWishlist}
      >
        {updatingWishlist
          ? "UPDATING..."
          : isWishlisted
          ? "♥ REMOVE FROM WISHLIST"
          : "♡ ADD TO WISHLIST"}
      </button>
    </div>
  </div>
</article>


);
}

export default ProductCard;
