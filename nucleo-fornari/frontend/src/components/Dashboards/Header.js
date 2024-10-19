import Logo from "../../assets/icons/logo-branco.png"
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';


function Header() {

    return (

        <header className="flex h-10 bg-blue-main justify-center items-center px-8 py-5">
            <div className="notifications">
                <Badge badgeContent={5} color="error" className="text-white-main ">
                <NotificationsIcon className="text-4xl text-white-gray"></NotificationsIcon>
                </Badge>
            </div>
        </header>

    )

}

export default Header;