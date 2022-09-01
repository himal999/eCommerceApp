import { useParams } from 'react-router-dom';
import { useReducer } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, product: [], loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        product: action.load,
        loading: false,
        error: '',
      };
    case 'FETCH_FAIL':
      return { ...state, product: [], loading: false, error: action.msg };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ product, loading, error }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchDate = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', load: result.data });
      } catch (e) {
        dispatch({ type: 'FETCH_FAIL', msg: e.message });
      }
    };
    fetchDate();
  }, [slug]);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className=" w-full h-auto relative flex flex-col">
      <div className=" container mx-auto w-full h-auto flex flex-row">
        <div>
          <img src={product.image} alt={product.name} />
        </div>
        <div className=" flex flex-col">
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <h2>{product.name}</h2>
          <h2>{product.price}</h2>
          <h2>{product.description}</h2>
          {product.countInStock > 0 ? (
            <div className=" flex-col flex">
              <span>In Stock</span> <button>Add to cart</button>
            </div>
          ) : (
            <span>OutofStock</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
