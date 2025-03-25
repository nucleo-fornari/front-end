import { createContext, useState, useContext } from "react";

//const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const token = sessionStorage.getItem("TOKEN");
//     const func = sessionStorage.getItem("FUNC");
//     const id = sessionStorage.getItem("ID");
//     const nome = sessionStorage.getItem("NOME");
//     const salaId = sessionStorage.getItem("ID_SALA");
//     return token
//       ? { token, func, id, nome, salaId }
//       : null;
//   });

//   const login = (userData) => {
//     sessionStorage.setItem("TOKEN", userData.token);
//     sessionStorage.setItem("FUNC", userData.func);
//     sessionStorage.setItem("ID", userData.id);
//     sessionStorage.setItem("NOME", userData.nome);
//     sessionStorage.setItem("ID_SALA", userData.salaId);
//     setUser(userData);
//   };

//   const logout = () => {
//     sessionStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

//export const useAuth = () => useContext(AuthContext);