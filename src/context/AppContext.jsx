import { createContext, useReducer, useEffect } from 'react';
import { AppReducer, initialState } from '../reducer/AppReducer';
import { getToken, fetchOrders } from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    let isMounted = true;

    const initData = async () => {
      try {
        let authData = await getToken("SHARANYA V R", "148855");
        let token = authData.token;

        if (!token) {
          throw new Error('Token not found');
        }

        if (isMounted) {
          dispatch({ type: 'SET_TOKEN', payload: token });
        }

        const ordersData = await fetchOrders(token);

        if (isMounted) {
          const validOrders = ordersData.filter(order => order && order.id != null);
          dispatch({ type: 'SET_ORDERS', payload: validOrders });
        }
      } catch (err) {
        if (isMounted) {
          console.error("Initial auth failed, trying fallback");
        }
        try {
          let authData = await getToken("SHARANYA_V_R", "148855");
          let token = authData.token;

          if (!token) {
            throw new Error('Token not found');
          }

          if (isMounted) {
            dispatch({ type: 'SET_TOKEN', payload: token });
          }

          const ordersData = await fetchOrders(token);

          if (isMounted) {
            const validOrders = ordersData.filter(order => order && order.id != null);
            dispatch({ type: 'SET_ORDERS', payload: validOrders });
          }
        } catch (fallbackErr) {
          if (isMounted) {
            console.error("Fallback auth failed, using fallback dataset");
            const fallbackDataset = [
              { id: 1, customerName: 'Alice', status: 'delivered', total: 20 },
              { id: 2, customerName: 'Bob', status: 'pending', total: 30 },
              { id: 3, customerName: 'Charlie', status: 'cancelled', total: 15 }
            ];
            dispatch({ type: 'SET_ORDERS', payload: fallbackDataset });
            dispatch({ type: 'SET_ERROR', payload: 'API Failed. Using fallback data.' });
          }
        }
      }
    };

    initData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
