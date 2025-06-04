import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Avisos from "../Avisos";
import Utils from "../../../utils/Utils";
import HeaderBar from "../../header-bar/headerBar";
import useApi from "../../../hooks/ApiHook";

const PublicacoesProfessor = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [data, setData] = useState([]);
    const [avisosGerais, setAvisosGerais] = useState([]);
    const [recados, setRecados] = useState([]);
    const api = useApi();

    useEffect(() => {
        Promise.all([
            api.get('/eventos/publicacoes/usuario/' + sessionStorage.ID),
            api.get('/recados/responsavel/' + sessionStorage.ID)
        ])
        .then(([avisosRes, recadosRes]) => {
            const avisosMapeados = Utils.mapEventoToAviso(avisosRes.data, api);
            const recadosMapeados = Utils.mapRecadoToAviso(recadosRes.data, api);

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
    }, [api]);

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
