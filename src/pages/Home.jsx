import {Link} from "react-router-dom";
function Home(){
return(
<div>
<section>
<h1>Welcome to SIVK INKORA</h1>
<h2>Every book opens a new world.</h2>
<p>Discover stories, explore knowledge, and find your next favourite book.</p>
<Link to="/products">Explore Books →</Link>
</section>
<hr/>
<section>
<h2>Why INKORA?</h2>
<div>
<h3>📚 Explore Books</h3>
<p>Discover books across different categories.</p>
</div>
<div>
<h3>💡 Find Your Next Read</h3>
<p>Explore stories and ideas that inspire you.</p>
</div>
<div>
<h3>♡ Save Your Favourites</h3>
<p>Keep track of the books you love.</p>
</div>
<Link to="/products">Browse Our Collection →</Link>
</section>
</div>
)
}
export default Home;