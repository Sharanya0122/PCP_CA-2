import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { state } = useContext(AppContext);

  if (state.loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Orders</h1>
      {state.orders.map(order => (
        <div key={order.id} data-testid="order-item">
          <Link to={`/orders/${order.id}`}>Order #{order.id}</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
