import { createContext, useContext, useEffect, useState, useRef } from "react";

const WebSocketContext = createContext();

export const useSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const [usuarioId, setUsuarioId] = useState(sessionStorage.getItem("ID") || null);
    const [ws, setWs] = useState(null);
    const [notificacoes, setNotificacoes] = useState([]);
  
    useEffect(() => {
      if (!usuarioId) return;
  
      const socket = new WebSocket(`ws://localhost:8080/ws?usuarioId=${usuarioId}`);
  
      socket.onopen = () => console.log("🔗 Conectado ao WebSocket!");
  
      socket.onmessage = (event) => {
        try {
          const notificacao = JSON.parse(event.data);
          setNotificacoes((prev) => [...prev, notificacao]);
        } catch (error) {
          console.error("Erro ao processar mensagem WebSocket:", error);
        }
      };
  
      socket.onerror = (error) => console.error("Erro no WebSocket:", error);
  
      socket.onclose = () => console.log("❌ Conexão WebSocket fechada!");
  
      setWs(socket);
  
      return () => socket.close();
    }, [usuarioId]);
  
    return (
      <WebSocketContext.Provider value={{ ws, notificacoes, setUsuarioId }}>
        {children}
      </WebSocketContext.Provider>
    );
  };