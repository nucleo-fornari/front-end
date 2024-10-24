import Logo from "../../views/parents/logo-branco.png";
import { useState } from "react";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import EventIcon from '@mui/icons-material/Event';
import WarningIcon from '@mui/icons-material/Warning';
import UpdateIcon from '@mui/icons-material/SystemUpdate';
import { Badge, IconButton, Card, CardContent, Typography, ListItem, ListItemIcon, ListItemText } from "@mui/material";


// Mock de notificações
const mockNotifications = [
    { id: 1, message: "Nova mensagem de João", type: "message" },
    { id: 2, message: "Sua tarefa está atrasada!", type: "alert" },
    { id: 3, message: "Evento amanhã: Reunião da equipe", type: "event" },
    { id: 4, message: "Atualização disponível no sistema", type: "update" },
    { id: 5, message: "Nova solicitação de suporte", type: "alert" },
];

const getNotificationIcon = (type) => {
    switch (type) {
        case "message":
            return <MessageIcon style={{ color: "#1976d2" }} />; // Azul para mensagens
        case "alert":
            return <WarningIcon style={{ color: "#d32f2f" }} />; // Vermelho para alertas
        case "event":
            return <EventIcon style={{ color: "#388e3c" }} />; // Verde para eventos
        case "update":
            return <UpdateIcon style={{ color: "#f57c00" }} />; // Laranja para atualizações
        default:
            return <NotificationsIcon />;
    }
};

function Header() {
    const [open, setOpen] = useState(false);

    const toggleNotifications = () => {
        setOpen(!open);
    };

    return (
        <header className="flex h-16 bg-blue-main justify-between items-center px-8 py-4 relative">
            <div className="notifications">
                <Badge badgeContent={5} color="error" className="text-white-main ">
                <NotificationsIcon className="text-4xl text-white-gray"></NotificationsIcon>
                </Badge>
            </div>
            <img src={Logo} alt="Logo" className="h-67 w-100" />

            {/* Ícone de Notificações */}
            <div className="relative">
                <IconButton onClick={toggleNotifications}>
                    <Badge badgeContent={5} color="error">
                        <NotificationsIcon className="text-4xl text-white-gray" />
                    </Badge>
                </IconButton>

                {/* Aba de Notificações */}
                {open && (
                    <Card
                        style={{
                            position: "absolute",
                            top: "50px",
                            right: "0",
                            width: "300px",
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            zIndex: 10,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">Notificações</Typography>
                            {mockNotifications.length > 0 ? (
                                mockNotifications.map((notification) => (
                                    <ListItem
                                        key={notification.id}
                                        style={{
                                            marginTop: "10px",
                                            padding: "10px",
                                            borderRadius: "8px",
                                            backgroundColor: "#f5f5f5",
                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <ListItemIcon>{getNotificationIcon(notification.type)}</ListItemIcon>
                                        <ListItemText
                                            primary={notification.message}
                                            primaryTypographyProps={{ fontSize: '16px', fontWeight: 'italic' }}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography>Nenhuma notificação.</Typography>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </header>
    );
}

export default Header;
