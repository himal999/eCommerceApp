import { Link } from 'react-router-dom';
import { data } from '../data.js';
function HomeScreen() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Featured Products</h1>
      <div className="flex flex-wrap justify-center">
        {data.products.map((product) => (
          <div key={product.slug} className="border-[1px] border-black m-4">
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-[100%] max-w-[400px]"
              />
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>${product.price}</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
