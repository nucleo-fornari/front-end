import React, { useState, useEffect } from "react";
import './headerBar.css'
import SingleButtonComponent from "../side-menu/single-button/singleButtonComponent";
import logoutIcon from "../../assets/imgs/logoutIcon.svg";
import logoBrancoIcon from '../../assets/imgs/logoBrancoIcon.png'

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import EventIcon from "@mui/icons-material/Event";
import WarningIcon from "@mui/icons-material/Warning";
import UpdateIcon from "@mui/icons-material/SystemUpdate";
import {
    Card,
    CardContent,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import useSocket from "../../services/useSocket";

const getNotificationIcon = (type) => {
    switch (type) {
        case "NOVO USUARIO":
            return <MessageIcon style={{ color: "#1976d2" }} />; // Azul para mensagens
        case "CHAMADO":
            return <WarningIcon style={{ color: "#d32f2f" }} />; // Vermelho para alertas
        case "event":
            return <EventIcon style={{ color: "#388e3c" }} />; // Verde para eventos
        case "update":
            return <UpdateIcon style={{ color: "#f57c00" }} />; // Laranja para atualizações
        default:
            return <NotificationsIcon />;
    }
};

const HeaderBar = ({ title }) => {

    const { notificacoes } = useSocket(sessionStorage.ID);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [open, setOpen] = useState(false);

    const toggleNotifications = () => setOpen(!open)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        console.log("Notificações recebidas:", notificacoes);
    }, [notificacoes]);

    return (
        <div className={`container-header ${isMobile ? 'container-header-mobile' : ''}`}>
            <span className={`title ${isMobile ? 'title-mobile' : 'title'}`}>{title}</span>

            <IconButton
                size="large"
                aria-label="show 4 new notifications"
                color="inherit"
                onClick={toggleNotifications}
            >
                {open && (
                    <Card
                        sx={{
                            position: "absolute",
                            top: "50px",
                            right: 0,
                            width: "320px",
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            zIndex: 10,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                Notificações
                            </Typography>
                            <Box
                                sx={{
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                }}
                            >
                                {notificacoes.length > 0 ? (
                                    notificacoes.map((notification) => (
                                        <ListItem
                                            key={notification.id}
                                            sx={{
                                                padding: "10px",
                                                borderRadius: "8px",
                                                backgroundColor: "#f5f5f5",
                                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <ListItemIcon>{getNotificationIcon(notification.titulo)}</ListItemIcon>
                                            <ListItemText
                                                primary={`${notification.titulo} - ${notification.mensagem}`}
                                                secondary={new Date(
                                                    notification.dataCriacao[0], // Ano
                                                    notification.dataCriacao[1] - 1, // Mês (ajustado porque no JS começa do 0)
                                                    notification.dataCriacao[2], // Dia
                                                    notification.dataCriacao[3], // Hora
                                                    notification.dataCriacao[4], // Minuto,
                                                    notification.dataCriacao[5] // Segundo
                                                ).toLocaleString("pt-BR", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                                primaryTypographyProps={{
                                                    fontSize: "16px",
                                                    fontWeight: "italic",
                                                }}
                                            />
                                        </ListItem>
                                    ))
                                ) : (
                                    <Typography sx={{ textAlign: "center", py: 2 }}>
                                        Nenhuma notificação.
                                    </Typography>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                )}
                <Badge badgeContent={notificacoes.length} color="error">
                    <NotificationsIcon fontSize="inherit" />
                </Badge>
            </IconButton>

            <div className={`container-logout`}>
                {isMobile && (
                    <div>
                        <img className={'icon-logo-mobile'} src={logoBrancoIcon} alt="logo nucleo fornari" />
                    </div>
                )}
                {isMobile && (
                    <div>
                        <SingleButtonComponent
                            btnIcon={logoutIcon}
                            btnText={"Sair"}
                            event={"logout"}
                            isMobile={isMobile}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default HeaderBar;