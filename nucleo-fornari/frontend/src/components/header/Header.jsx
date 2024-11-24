import logoHorizontal from "../../assets/imgs/logoBrancoHorizontal.png"
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import MessageIcon from '@mui/icons-material/Message';
import EventIcon from '@mui/icons-material/Event';
import WarningIcon from '@mui/icons-material/Warning';
import UpdateIcon from '@mui/icons-material/SystemUpdate';
import { Card, CardContent, ListItem, ListItemIcon, ListItemText } from "@mui/material";

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
    { id: 5, message: "Reunião daqui a 1 hora", type: "alert" },
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


export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [open, setOpen] = React.useState(false);

    const toggleNotifications = () => {
        setOpen(!open);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
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

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={4} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box>
            <AppBar position="static" className="lg:h-16 md:h-28 flex justify-center">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <img src={logoHorizontal} className="lg:h-45 lg:w-156 md:h-90 md:w-313" />
                    </Typography>
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }}} >
                        <IconButton
                            
                            aria-label="show 4 new notifications"
                            color="inherit"
                            onClick={toggleNotifications}
                        >
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
                            <Badge badgeContent={4} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {/* possível ícone de perfil do usuário */}
                        {/* <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton> */}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}