import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useReducer } from 'react';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold">Featured Products</h1>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <div className=" text-black text-3xl">Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
