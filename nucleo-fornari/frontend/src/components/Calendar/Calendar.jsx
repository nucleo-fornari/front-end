import { useEffect, useState, useRef } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Paper, Box, Typography } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';
import CustomModal from './Modal/CustomModal';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

const initialValue = dayjs('2022-04-17');

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            const daysInMonth = date.daysInMonth();
            const daysToHighlight = [1, 2, 3, 4, 5, 6].map(() => getRandomNumber(1, daysInMonth));

            resolve({ daysToHighlight });
        }, 500);

        signal.onabort = () => {
            clearTimeout(timeout);
            reject(new DOMException('aborted', 'AbortError'));
        };
    });
}

function Calendario() {
    const [value, setValue] = useState(null);
    const requestAbortController = useRef(null);
    const [open, setOpen] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([]); // Dias com eventos
    // const [eventos, setEventos] = useState([])

    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        fakeFetch(date, {
            signal: controller.signal,
        })
            .then(({ daysToHighlight }) => {
                setHighlightedDays(daysToHighlight);
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    throw error;
                }
            });
        requestAbortController.current = controller;
    };

    useEffect(() => {
        fetchHighlightedDays(initialValue);
        return () => requestAbortController.current?.abort();
    }, []);

    function ServerDay(props) {
        const { highlightedDays, day, outsideCurrentMonth, ...other } = props;
        
        const isSelected =
            !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ?
                    <Box sx={{
                        width: '8px', // Aumenta o tamanho da bolinha
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'red', // Cor azul
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }} />
                    : undefined}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    }

    const eventsForDate = [ // mockados
        { 
            time: '13:00', 
            title: 'Reunião Pós-almoço', 
            color: 'primary',
            date: '2024-09-20',
            description: 'Reunião para discutir os pontos pós-almoço.'
        },
        { 
            time: '17:30', 
            title: 'Reunião com pai do Pedro', 
            color: 'success',
            date: '2024-09-20', // Data do evento
            description: 'Conversar sobre o andamento do projeto com o pai do Pedro.'
        },
        { 
            time: '18:00', 
            title: 'Reunião com a diretora', 
            color: 'error',
            date: '2024-09-20', // Data do evento
            description: 'Reunião para discutir o relatório mensal.'
        },
    ];

    const handleDateChange = (newValue) => {
        setValue(newValue);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: '#f5f5f5', // Fundo claro
                padding: '20px',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    padding: '20px',
                    borderRadius: '10px',
                    maxWidth: '400px',
                    margin: '0 auto',
                    backgroundColor: '#fff',
                }}
            >
                <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                    Agenda de eventos
                </Typography>
                <DateCalendar
                    value={value}
                    onChange={handleDateChange}

                    dayOfWeekFormatter={(date) => {
                        return dayjs(date).format('ddd').charAt(0).toUpperCase();
                    }}

                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                        },
                    }}

                    sx={{
                        '.MuiPickersCalendarHeader-root': {
                            backgroundColor: '#1976d2', // Azul Material UI
                            color: 'white',
                            padding: '10px',
                        },
                        '.MuiPickersDay-dayWithMargin': {
                            borderRadius: '50%', // Botões circulares
                        },
                        '.MuiPickersDay-root': {
                            '&.Mui-selected': {
                                backgroundColor: '#1976d2', // Dia selecionado
                                color: '#fff',
                            },
                            '&:hover': {
                                backgroundColor: '#bbdefb', // Dia ao passar o mouse
                            },
                        },
                    }}
                />
            </Paper>
            <CustomModal open={open} handleClose={handleClose} value={value} events={eventsForDate} />
        </Box>
    );
}

export default Calendario;