import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = sessionStorage.TOKEN;
    const func = sessionStorage.FUNC;

    if (token && func) {
      setUser({
        token,
        func,
        id: sessionStorage.ID,
        nome: sessionStorage.NOME,
        salaId: sessionStorage.ID_SALA,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);