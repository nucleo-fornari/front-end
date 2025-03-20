import { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const usuarioId = sessionStorage.getItem("ID");
  const [ws, setWs] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    if (!usuarioId) return; // Se não houver usuário, não conecta

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

    return () => socket.close(); // Fecha o WebSocket ao desmontar
  }, [usuarioId]);

  return (
    <WebSocketContext.Provider value={{ ws, notificacoes }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);