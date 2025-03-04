import logoHorizontal from "../../assets/imgs/logoBrancoHorizontal.png";
import {useState} from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Mock de notificações
const mockNotifications = [
  { id: 1, message: "Abertura de Chamado Urgente!", type: "alert" },
  { id: 2, message: "Foi adicionado um Recado", type: "message" },
  { id: 3, message: "Evento amanhã: Reunião de Pais", type: "event" },
  { id: 5, message: "Reunião daqui a 1 hora", type: "update" },
];

const getNotificationIcon = (type) => {
  switch (type) {
    case "NOVO USUARIO":
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

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [open, setOpen] = useState(false);
  const { notificacoes } = useSocket(sessionStorage.ID);

  const toggleNotifications = () => {
    setOpen(!open);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static" className="lg:h-16 md:h-28 flex justify-center">
        <Toolbar>
          <img
            src={logoHorizontal}
            alt=""
            className="lg:h-45 lg:w-156 md:h-90 md:w-313"
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ position: "relative" }}>
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
                              primary={`${notification.titulo} - ${notification.mensagem}`} // Corrigido aqui
                              secondary={new Date(notification.dataCriacao).toLocaleString("pt-BR", {
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
          </Box>

        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}
