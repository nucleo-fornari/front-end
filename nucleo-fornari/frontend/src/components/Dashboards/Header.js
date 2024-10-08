import Logo from "../../views/parents/logo-branco.png"
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';


function Header() {

    return (

        <header className="flex h-10 bg-blue-main justify-center items-center px-8 py-5 justify-between">
            <img src={Logo} className="h-67 w-100"></img>
            <div className="notifications">
                <Badge badgeContent={5} className="text-white-main ">
                <NotificationsIcon className="text-4xl text-white-gray"></NotificationsIcon>
                </Badge>
            </div>
        </header>

    )

}

export default Header;