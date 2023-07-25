import { createContext, useContext, useReducer } from 'react';

const BalanceContext = createContext(null);
const BalanceDispatchContext = createContext(null);

export function BalanceProvider({ children }) {
    const [balance, dispatch] = useReducer(
      balanceReducer,
      initialBalance
    );

    return (
        <BalanceContext.Provider value={balance}>
          <BalanceDispatchContext.Provider value={dispatch}>
            {children}
          </BalanceDispatchContext.Provider>
        </BalanceContext.Provider>
      );
};

export function useBalance() {
    return useContext(BalanceContext);
  }
  
  export function useBalanceDispatch() {
    return useContext(BalanceDispatchContext);
  }
  
  function balanceReducer(balance, action) {
    switch (action.type) {
      case 'deposit': {
        return balance + action.value;
      }

      case 'withdraw': {
        return balance - action.value;
      }
      
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  
  const initialBalance = 1000;