import { data } from './data';

function App() {
  return (
    <div>
      <header className="bg-dark_1">
        <a href="/">Amazon</a>
      </header>
      <main className="p-4">
        <h1 className="text-2xl font-bold">Featured Products</h1>
        <div className="flex flex-wrap justify-center">
          {data.products.map((product) => (
            <div key={product.slug} className="border-[1px] border-black m-4">
              <a href={`/product/${product.slug}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[100%] max-w-[400px]"
                />
              </a>
              <div className="p-4">
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
