import { useParams } from 'react-router-dom';
import { useReducer } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

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
    <div>{product.name}</div>
  );
}

export default ProductScreen;
