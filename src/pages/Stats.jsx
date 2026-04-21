import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Stats = () => {
  const { state } = useContext(AppContext);

  const orders = state.orders || [];
  
  const total = orders.length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const cancelled = orders.filter(o => o.status === 'cancelled').length;

  useEffect(() => {
    window.appState = {
      total,
      delivered,
      cancelled
    };
  }, [total, delivered, cancelled]);

  if (state.loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Stats</h2>
      <div data-testid="total-orders">{total}</div>
      <div data-testid="delivered-orders">{delivered}</div>
      <div data-testid="cancelled-orders">{cancelled}</div>
    </div>
  );
};

export default Stats;
