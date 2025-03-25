import { useEffect, useState } from "react";
import Calendario from "./Calendario";
import CustomModal from "../modals/calendario/CustomModal"
import api from "../../services/api"

export default function FetchData() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState("");
    const [event, setEvent] = useState([]);
    const [events, setEvents] = useState();

    const handleClose = () => {
        setIsModalOpen(false);
    }

    const handleClickEvent = (event) => {
        setEvent(event)
        setIsModalOpen(true);
    }

    useEffect(() => {
        api.get("/eventos").then((response) => {
            setEvents(
                response.data.map((event) => {
                    return {
                        id: event.id,
                        titulo: event.titulo,
                        descricao: event.descricao,
                        data: new Date(event.data) // Certifique-se de que o backend retorna uma data no formato correto
                    };
                })
            );
        }).catch((error) => {
            console.error("Erro ao buscar eventos:", error);
        });
    }, []);

    return (
        <>
            <CustomModal setEvent={setEvent} setEvents={setEvents} open={isModalOpen} handleClose={handleClose} value={date} events={event} />
            <Calendario handleClickEvent={handleClickEvent} setIsModalOpen={setIsModalOpen} setDate={setDate} events={events} />
        </>
    )
}
