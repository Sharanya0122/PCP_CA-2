import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const OrderDetail = () => {
  const { id } = useParams();
  const { state } = useContext(AppContext);

  if (state.loading) return <div>Loading...</div>;

  const order = state.orders.find(o => String(o.id) === String(id));

  if (!order) return <div>Order not found</div>;

  return (
    <div>
      <h2>Order Details</h2>
      <p>ID: {order.id}</p>
      <p>Status: {order.status}</p>
      <pre>{JSON.stringify(order, null, 2)}</pre>
      <Link to="/">Back to Orders</Link>
    </div>
  );
};

export default OrderDetail;
