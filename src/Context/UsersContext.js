import { createContext, useContext, useReducer } from 'react';

const UsersContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
    const [users, dispatch] = useReducer(
      usersReducer,
      initialUsers
    );

    return (
        <UsersContext.Provider value={users}>
          <UsersDispatchContext.Provider value={dispatch}>
            {children}
          </UsersDispatchContext.Provider>
        </UsersContext.Provider>
      );
};

export function useUsers() {
    return useContext(UsersContext);
  }
  
  export function useUsersDispatch() {
    return useContext(UsersDispatchContext);
  }
  
  function usersReducer(users, action) {
    switch (action.type) {
      case 'add': {
        return [...users, {
            id: action.id,
            name: action.name,
            email: action.email,
            password: action.password
          }];
      }
      
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  
  const initialUsers = [
    { id: 0, name: 'User1', email: 'user1@email.com', password: '1234' },
    { id: 1, name: 'User2', email: 'user2@email.com', password: '1234' },
    { id: 2, name: 'User3', email: 'user3@email.com', password: '1234' },
    { id: 3, name: 'User4', email: 'user4@email.com', password: '1234' },   
  ];