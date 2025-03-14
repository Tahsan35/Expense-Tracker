import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //user to update data
  const updateUser = (data) => {
    setUser(data);
  };

  ///fn to clear user data
  const clearUser = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
