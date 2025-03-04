import { useEffect, useState } from "react";

const useWebSocket = (usuarioId) => {
  const [ws, setWs] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/ws?usuarioId=${usuarioId}`);

    socket.onopen = () => console.log("🔗 Conectado ao WebSocket!");
    
    socket.onmessage = (event) => {
      try {
        const notificacao = JSON.parse(event.data);
        setNotificacoes((prevNotificacoes) => [...prevNotificacoes, notificacao]);
      } catch (error) {
        console.error("Erro ao processar mensagem WebSocket:", error);
      }
    };

    socket.onerror = (error) => console.error("Erro no WebSocket:", error);
    
    socket.onclose = () => console.log("❌ Conexão WebSocket fechada!");

    setWs(socket);

    return () => socket.close();
  }, [usuarioId]);

  return { ws, notificacoes };
};

export default useWebSocket;