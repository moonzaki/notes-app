import { createContext, useState } from 'react';

const UserContext = createContext({
  userId: 1
});

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(1);

  return <UserContext.Provider value={{ userId, setUserId }}>
    {children}
  </UserContext.Provider>;
};

export { UserContext };
export { UserContextProvider };
