import React, { createContext, useReducer } from 'react';

const initialState = {
  users: [],
  products: [], 
  filters: {
    pageSize: 5,
    title: '',
    brand: '',
    category: '',
  },
};

const GlobalContext = createContext(initialState);

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_USERS':
        return { ...state, users: action.payload };
      case 'SET_PRODUCTS':
        return { ...state, products: action.payload };
      case 'SET_FILTERS':
        return { ...state, filters: action.payload };
      default:
        return state;
    }
  }, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
