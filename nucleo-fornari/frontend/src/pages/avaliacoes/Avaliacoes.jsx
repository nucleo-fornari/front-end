import HeaderBar from "../../components/header-bar/headerBar";
import React, {useEffect, useState} from "react";
import {
    Box,
    Button, Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from "../../services/api";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DimensoesModal from "../../components/modals/dimensoes/Dimensoes"
import AvaliacaoService from "../../services/AvaliacaoService"
import {toast} from "react-toastify";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";

const Avaliacoes = () => {

    const [selected, setSelected] = useState(null);
    const [data, setData] = useState([]);
    const [alunoData, setAlunoData] = useState({});
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isModalDimensoesOpen, setIsModalDimensoesOpen] = useState(false);
    const [tipoDimensao, setTipoDimensao] = useState(null);
    const [dimensaoSocioAfetivoEmocionalValue, setDimensaoSocioAfetivoEmocionalValue] = useState('');
    const [dimensaoFisicoMotora, setDimensaoFisicoMotora] = useState('');
    const [dimensaoCognitiva, setDimensaoCognitiva] = useState('');
    const [ano, setAno] = useState('');

    const fetchSalas = async () => {
        try {
            const salaId = parseInt(sessionStorage.ID_SALA);
            const res = await api.get(`salas/${salaId}`);
            const alunos = res.data.alunos;
            console.log(alunos);
            setData(alunos);
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
        }
    }
    useEffect(() => {
        fetchSalas();
    }, []);

    useEffect(() => {
        console.log(alunoData)
    }, [alunoData]);

    const handleNewAvaliacaoClick = () => {
        setIsFormOpen(true);
    }

    const handleGerenciar =  (id) => {
        setSelected(id);
        setAlunoData(data.find(x => x.id === id))
    }

    //FORMULARIO
    const [periodo, setPeriodo] = useState('');
    const [bimestre, setBimestre] = useState('');
    const [texto, setTexto] = useState('');

    const handlePeriodoChange = (event) => {
        setPeriodo(event.target.value);
    };

    const handleBimestreChange = (event) => {
        setBimestre(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            !periodo ||
            !bimestre ||
            !dimensaoSocioAfetivoEmocionalValue ||
            !dimensaoFisicoMotora ||
            !dimensaoCognitiva ||
            !ano
        ) {
            toast.error("Preencha todos os campos");
            return;
        }

        if (!(/^[0-9]{4}$/).test(ano)) {
            toast.error("Insira um ano válido");
            return;
        }

        if (!(/^[1-4]$/).test(bimestre)) {
            toast.error("Insira um bimestre válido");
            return;
        }

        const formData = {
            periodo: periodo,
            bimestre: bimestre,
            textoSocioAfetivaEmocional: dimensaoSocioAfetivoEmocionalValue,
            textoFisicoMotora: dimensaoFisicoMotora,
            textoCognitiva: dimensaoCognitiva,
            ano: ano,
            alunoId: alunoData.id
        }

        AvaliacaoService.createAvaliacao(formData).then(res => {
            toast.success('Criado com sucesso!');
            setAlunoData({...alunoData, avaliacoes: [...alunoData.avaliacoes, res.data]});
            fetchSalas();
            closeForm();
        }).catch(error => {
            console.log(error)
            toast.error('Erro ao criar.');
        })
    };

    const adicionarDimensaoSocioAfetivoEmocional = () => {
        setIsModalDimensoesOpen(true);
        setTipoDimensao("SOCIO_EMOCIONAL_AFETIVO");
    }

    const adicionarDimensaoFisicoMotora = () => {
        setIsModalDimensoesOpen(true);
        setTipoDimensao("FISICO_MOTORA");
    }

    const adicionarDimensaoCognitiva = () => {
        setIsModalDimensoesOpen(true);
        setTipoDimensao("COGNITIVA");
    }

    const onCloseModal = () => {
        setIsModalDimensoesOpen(false);
        setTipoDimensao(null);
    }

    const handleDimensaoSocioAfetivoEmocionalChange = (value) => {
        setDimensaoSocioAfetivoEmocionalValue(value);
    }

    const handleDimensaoFisicoMotoraChange = (value) => {
        setDimensaoFisicoMotora(value);
    }

    const handleDimensaoCognitivaChange = (value) => {
        setDimensaoCognitiva(value);
    }

    const output = (v) => {
        if (tipoDimensao === "SOCIO_EMOCIONAL_AFETIVO") {
            handleDimensaoSocioAfetivoEmocionalChange(v)
        } else if (tipoDimensao === "FISICO_MOTORA") {
            handleDimensaoFisicoMotoraChange(v);
        } else {
            handleDimensaoCognitivaChange(v);
        }
    }

    const closeForm = () => {
        setAno('');
        setDimensaoCognitiva('');
        setDimensaoFisicoMotora('');
        setDimensaoSocioAfetivoEmocionalValue('');
        setBimestre('');
        setPeriodo('');
        setIsFormOpen(false);
    }

    const handleDeleteAvaliacao = (id) => {
        AvaliacaoService.deleteAvaliacao(id).then(res => {
            toast.success('Deletado com sucesso!');
            const newData = {...alunoData, avaliacoes: alunoData.avaliacoes.filter(x => x.id !== id)};
            setAlunoData(newData);
            fetchSalas();
        }).catch(error => {
            toast.error("Erro ao deletar.");
        })
    }

    const handleDownloadFile = (id) => {
        AvaliacaoService.downloadPdf(id).then(response => {
            const blob = response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'avaliacao.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
            .catch(error => console.error('Erro ao gerar PDF:', error));
    };




    return (
        <>
            <HeaderBar title={"Gerenciar Avaliações"} />
            <DimensoesModal
                open={isModalDimensoesOpen}
                userId={sessionStorage.ID}
                tipoDimensao={tipoDimensao}
                onClose={onCloseModal}
                output={output}
            >
            </DimensoesModal>
            <div style={{ margin: "3%" }}>
                {!selected ? (
                    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1, maxHeight: '50vh', overflowY: 'auto'}}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>RA</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.length > 0 ? (
                                    data.map((row) => (
                                        <TableRow key={row.id} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' } }}>
                                            <TableCell align="center">
                                                <Box sx={{ p: 1, borderRadius: 1 }}>{row.ra}</Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ p: 1, borderRadius: 1 }}>{row.nome}</Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    sx={{ borderRadius: 2 }}
                                                    onClick={() => handleGerenciar(row.id)}
                                                >
                                                    Gerenciar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 3, fontStyle: "italic" }}>
                                            Nenhum aluno encontrado
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <>
                        <IconButton
                            onClick={!isFormOpen ? () => setSelected(null) : () => closeForm()}
                            sx={{ color: 'blue', fontSize: 30 }}
                        >
                            <ArrowBackIcon />
                        </IconButton>

                    {!isFormOpen ? (
                        <>
                        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1, maxHeight: '50vh', overflowY: 'auto'}}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ano</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Bimestre</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {alunoData.avaliacoes.length > 0 ? (
                                        alunoData.avaliacoes.map((row) => (
                                            <TableRow key={row.id} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' } }}>
                                                <TableCell align="center">
                                                    <Box sx={{ p: 1, borderRadius: 1 }}>{row.ano}</Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ p: 1, borderRadius: 1 }}>{row.bimestre}°</Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton>
                                                        <InsertDriveFileIcon
                                                            onClick={() => handleDownloadFile(row.id)}
                                                            sx={{ color: 'green' }}
                                                        />
                                                    </IconButton>
                                                    <DeleteIcon
                                                        style={{ color: 'red', cursor: 'pointer' }}
                                                        onClick={() => handleDeleteAvaliacao(row.id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ py: 3, fontStyle: "italic" }}>
                                                Nenhuma avaliação encontrada
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <IconButton
                            onClick={() => handleNewAvaliacaoClick()}
                            sx={{
                                height: '35px',
                                width: '35px',
                                backgroundColor: '#fff',
                                borderRadius: '50%',
                                border: 'solid 2px #4169e1',
                                padding: '10px',
                                '&:hover': {
                                    backgroundColor: 'rgba(97, 219, 92, 0.5)',
                                },
                                mt: 2
                            }}
                        >
                            <AddIcon sx={{ color: '#4169e1' }} />
                        </IconButton>
                        </>
                    ) :
                        (<Box sx={{ maxWidth: '80%', maxHeight: '70vh', margin: '0 auto', padding: 2, overflowY: 'auto'}}>
                            <form onSubmit={handleSubmit}>
                                {/* Campos Período e Bimestre lado a lado */}
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Período"
                                            variant="outlined"
                                            fullWidth
                                            value={periodo}
                                            onChange={handlePeriodoChange}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            label="Ano"
                                            variant="outlined"
                                            fullWidth
                                            value={ano}
                                            onChange={(e) => setAno(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="bimestre-label">Bimestre</InputLabel>
                                            <Select
                                                labelId="bimestre-label"
                                                value={bimestre}
                                                onChange={handleBimestreChange}
                                                label="Bimestre"
                                            >
                                                <MenuItem value="1">1º Bimestre</MenuItem>
                                                <MenuItem value="2">2º Bimestre</MenuItem>
                                                <MenuItem value="3">3º Bimestre</MenuItem>
                                                <MenuItem value="4">4º Bimestre</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                {/* Caixa de texto grande com a nova label e botão ao lado */}
                                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                    <Grid item xs={10}>
                                        <TextField
                                            label="Dimensão sócio-afetivo-emocional"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            value={dimensaoSocioAfetivoEmocionalValue}
                                            onChange={(e) => handleDimensaoSocioAfetivoEmocionalChange(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={(e) => adicionarDimensaoSocioAfetivoEmocional(e.target.value)}
                                            sx={{
                                                width: '100%',
                                            }}
                                        >
                                            + Adicionar Texto Pronto
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                    <Grid item xs={10}>
                                        <TextField
                                            label="Dimensão físico-motora"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            value={dimensaoFisicoMotora}
                                            onChange={(e) => handleDimensaoFisicoMotoraChange(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={adicionarDimensaoFisicoMotora}
                                            sx={{
                                                width: '100%',
                                            }}
                                        >
                                            + Adicionar Texto Pronto
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                    <Grid item xs={10}>
                                        <TextField
                                            label="Dimensão cognitiva"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            value={dimensaoCognitiva}
                                            onChange={handleDimensaoCognitivaChange}
                                        />
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={adicionarDimensaoCognitiva}
                                            sx={{
                                                width: '100%',
                                            }}
                                        >
                                            + Adicionar Texto Pronto
                                        </Button>
                                    </Grid>
                                </Grid>

                                {/* Botão Enviar */}
                                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                                    Enviar
                                </Button>
                            </form>
                        </Box>)
                    }
                    </>
                )}
            </div>
        </>
    );
}

export default Avaliacoes;