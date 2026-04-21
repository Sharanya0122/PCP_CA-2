import { createContext, useEffect, useReducer } from "react";
import { getDataset, getToken } from "../services/api";
import orderReducer, { initialState } from "../reducer/orderReducer";

const OrderContext = createContext(null);

const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Fetch orders from server
  useEffect(() => {
    const fetchMovies = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        // Step 1: Get Token
        const tokenRes = await getToken(
          "E0123041", // replace during exam
          "148855", // replace during exam
          "setA", // dataset set
        );

        // Step 2: Fetch dataset
        const dataset = await getDataset(tokenRes.token, tokenRes.dataUrl);
        const rawOrders = Array.isArray(dataset)
          ? dataset
          : dataset?.orders || dataset?.data || [];

        dispatch({ type: "SET_ORDERS", payload: rawOrders });
      } catch (err) {
        console.error("Error fetching data:", err.message);
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };

    fetchMovies();
  }, []);

  const setFilterText = (value) => {
    dispatch({ type: "SET_FILTER_TEXT", payload: value });
  };

  const markAsDelivered = (orderId) => {
    dispatch({ type: "MARK_AS_DELIVERED", payload: orderId });
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        filterText: state.filterText,
        setFilterText,
        markAsDelivered,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
