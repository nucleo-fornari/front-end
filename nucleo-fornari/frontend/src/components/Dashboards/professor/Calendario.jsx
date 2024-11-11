import Calendar from "../../Calendar/Calendar"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function Calendario(props) {

    return (
    <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
    <Calendar/>
    </LocalizationProvider>
    )

}

export default Calendario;