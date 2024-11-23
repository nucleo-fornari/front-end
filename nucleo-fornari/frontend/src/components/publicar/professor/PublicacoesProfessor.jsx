import React, {useEffect, useState} from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AvisosService from "../../../services/AvisosService";
import { toast } from 'react-toastify';
import Avisos from "../Avisos";
import Utils from "../../../utils/Utils";

const PublicacoesProfessor = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [data, setData] = useState([]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        if (selectedValue === '1') {
            loadAvisosGerais();
        } else if (selectedValue === '2') {
            loadRecados();
        }
    }, [selectedValue]);

    const loadAvisosGerais = () => {
        AvisosService.getPublicacaoById(sessionStorage.ID).then((res) => {
            setData(Utils.mapEventoToAviso(res.data));
        }).catch((error) => console.log(error));
    }

    const loadRecados = () => {
        AvisosService.getRecadosByResponsavelId(sessionStorage.ID).then((res) => {
            setData(Utils.mapRecadoToAviso(res.data));
        }).catch((error) => console.log(error));
    }

    return (
        <div style={{margin: '3%'}}>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Tipo de evento</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValue}
                    onChange={handleChange}
                    label="Escolha uma opção"
                    sx={{ width: '200px', fontSize: '14px', padding: '5px' }}
                >
                    <MenuItem value="1">Avisos Gerais</MenuItem>
                    <MenuItem value="2">Recados Individuais</MenuItem>
                </Select>
            </FormControl>
            <Avisos setData={setData} data={data}></Avisos>
        </div>
    );
}

export default PublicacoesProfessor;