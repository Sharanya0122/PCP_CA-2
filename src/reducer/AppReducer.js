export const initialState = {
  orders: [],
  loading: true,
  error: null,
  token: null
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
