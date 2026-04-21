import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Filter = () => {
  const { state } = useContext(AppContext);
  const [filterText, setFilterText] = useState('');

  if (state.loading) return <div>Loading...</div>;

  const filteredOrders = state.orders.filter(order => {
    return order.id.toString().includes(filterText) || 
           (order.status && order.status.toLowerCase().includes(filterText.toLowerCase()));
  });

  return (
    <div>
      <h2>Filter Orders</h2>
      <input 
        data-testid="filter-input" 
        value={filterText} 
        onChange={e => setFilterText(e.target.value)} 
        placeholder="Filter by ID or status..."
      />
      <div>
        {filteredOrders.map(order => (
          <div key={order.id} data-testid="order-item">
            <Link to={`/orders/${order.id}`}>Order #{order.id} - {order.status}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
