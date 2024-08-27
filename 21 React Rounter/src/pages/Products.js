import { Link } from 'react-router-dom';

const PRODUCTS = [
  {id: 'p1', title: 'Product1'},
  {id: 'p2', title: 'Product2'},
  {id: 'p3', title: 'Product3'},
];

function ProductsPage() {
  return <>
    <h1>The Product Page</h1>
    <ul>
      <li>
        {PRODUCTS.map((prod) => (
          <li key={prod.id}>
            <Link to={`/products/${prod.id}`}>{prod.title}</Link>
          </li>
        ))}
      </li>
    </ul>
  </>
}

export default ProductsPage;