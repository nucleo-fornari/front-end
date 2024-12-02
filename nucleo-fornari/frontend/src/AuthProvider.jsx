import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({
      token: sessionStorage.TOKEN,
      func: sessionStorage.FUNC,
      id: sessionStorage.ID,
      nome: sessionStorage.NOME,
      salaId: sessionStorage.ID_SALA,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);