import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import AvisosService from "../../../services/AvisosService";
import { toast } from "react-toastify";
import Avisos from "../Avisos";
import Utils from "../../../utils/Utils";
import HeaderBar from "../../header-bar/headerBar";

const PublicacoesProfessor = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [data, setData] = useState([]);
    const [avisosGerais, setAvisosGerais] = useState([]);
    const [recados, setRecados] = useState([]);

    useEffect(() => {
        Promise.all([
            AvisosService.getPublicacaoById(sessionStorage.ID),
            AvisosService.getRecadosByResponsavelId(sessionStorage.ID)
        ])
        .then(([avisosRes, recadosRes]) => {
            const avisosMapeados = Utils.mapEventoToAviso(avisosRes.data);
            const recadosMapeados = Utils.mapRecadoToAviso(recadosRes.data);

            setAvisosGerais(avisosMapeados);
            setRecados(recadosMapeados);

            if (avisosMapeados.length > 0) {
                setSelectedValue("1");
                setData(avisosMapeados);
            } else if (recadosMapeados.length > 0) {
                setSelectedValue("2");
                setData(recadosMapeados);
            } else {
                setSelectedValue("1");
                setData([]);
            }
        })
        .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (selectedValue === "1") {
            setData(avisosGerais);
        } else if (selectedValue === "2") {
            setData(recados);
        }
    }, [selectedValue, avisosGerais, recados]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
        <HeaderBar title={"Publicar evento para turma"}/>
        <div style={{ margin: "3%" }}>
            
            <FormControl>
                <InputLabel id="demo-simple-select-label">Tipo de evento</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValue || ""}
                    onChange={handleChange}
                    label="Escolha uma opção"
                    sx={{ width: "200px", fontSize: "14px", padding: "5px" }}
                >
                    <MenuItem value="1">Avisos Gerais</MenuItem>
                    <MenuItem value="2">Recados Individuais</MenuItem>
                </Select>
            </FormControl>
            <Avisos setData={setData} data={data} />
        </div>
        </>
        
    );
};

export default PublicacoesProfessor;
