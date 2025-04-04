import React, {useEffect, useRef, useState} from 'react';
import "./Chamados.css";
import api from "../../services/api";
import {
  Box,
  Button,
  FormControl, FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField
} from "@mui/material";
import HeaderBar from '../header-bar/headerBar';
import {Cancel as CloseIcon, CheckCircle as CheckIcon, Save as SaveIcon} from "@mui/icons-material";
import {Queue} from "../../utils/classes/Queue";
import {Stack} from "../../utils/classes/Stack";
import {toast} from "react-toastify";
import TimerModal from "../modals/chamado/TimerModal";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import ChamadosService from "../../services/ChamadosService";

const ChamadosSecretaria = () => {
  const [data, setData] = useState([]);
  const [selectValue, setSelectValue] = useState(0);
  const [ordenated, setOrdenated] = useState(false);
  const [modifiedChamados, setModifiedChamados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [isModalGerenciarTiposOpen, setIsModalGerenciarTiposOpen] = useState(false);
  const queue = useRef(new Queue());
  const stack = useRef(new Stack());
  const [undoing , setUndoing] = useState(false);
  const [formTipoChamado, setFormTipoChamado] = useState({
    tipo: null,
    prioridade: null,
  });
  const [tiposChamados, setTiposChamados] = useState([]);

  const loadTiposChamados = () => {
    ChamadosService.getChamadosTipo().then((res) => {
      console.log(res)
      setTiposChamados(res.data ? res.data : [])
    });
  }

  const openGerenciarTiposModal = () => {
    setIsModalGerenciarTiposOpen(true);
  }

  const closeGerenciarTiposModal = () => {
    setIsModalGerenciarTiposOpen(false);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (!ordenated) {
      setTimeout(() => callOrdenator(0), 100)
    }
  }, [data])

  useEffect(() => {
    callOrdenator(parseInt(selectValue));
  }, [selectValue]);

  useEffect(() => {
    if (isModalGerenciarTiposOpen)
      loadTiposChamados();
  }, [isModalGerenciarTiposOpen])

  const fetchChamados = () => {
    api.get(`/chamados/abertos`)
      .then(res => setData(res.data))
      .catch(error => console.error("Erro ao buscar chamados:", error));
  };

  useEffect(() => {
    fetchChamados();
  }, []);

  useEffect(() => {
    let newModifiedChamados = modifiedChamados;
    if (Array.isArray(data)) {
      data.forEach((obj) => {
        newModifiedChamados = (newModifiedChamados.indexOf(obj.id) < 0
            ? (obj.finalizado ? [...newModifiedChamados, obj.id] : [...newModifiedChamados])
            : (obj.finalizado ? [...newModifiedChamados] : newModifiedChamados.filter(item => item !== obj.id)));
      });
    }
    setModifiedChamados(newModifiedChamados);
  }, [data])

  const handleMudarChamado = (id) => {
    setData((prevData) =>
        prevData.map((chamado) =>
            chamado.id === id ? { ...chamado, finalizado: !chamado.finalizado } : chamado
        )
    );
  };

  const handleSaveChanges = () => {
    modifiedChamados.forEach((item) => {
      queue.current.enqueue(item);
      stack.current.push(item);
    });

    setIsTimerModalOpen(true);
  };

  const handleSubmit = () => {
    setIsTimerModalOpen(false);
    const promises = [];

    if (queue.current.isEmpty()) return;

    while(!queue.current.isEmpty()) {
      const id = queue.current.dequeue();
      promises.push(api.patch(`/chamados/${id}`).catch((error) =>
          console.error(`Erro ao salvar o chamado ${id}:`, error)));
    }

    Promise.all(promises).then(() => {
      // Limpa o set de modificações e atualiza a lista de chamados ao concluir todas as requisições
      setModifiedChamados([]);
      fetchChamados();
      toast.success('Alterações salvas com sucesso!');
    });
  }

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value)
  }

  const callOrdenator = (type) => {
    if (data.length < 1) {
      return;
    }
    let v;
    if (type === 0) {
      v = data.map((x) => ({
        ...x,
        comparatorValue: x.prioridade
      }));

    } else if (type === 1) {
      v = data.map((x) => ({
        ...x,
        comparatorValue: x.tipo.tipo
      }));
    } else if (type === 2) {
      v = data.map((x) => ({
        ...x,
        comparatorValue: x.descricao
      }));
    }

    quickSort(v, 0, v.length - 1);
    setData(type !== 0 ? v.reverse() : v);
    setOrdenated(true);
  }

  const isBigger = (v1, v2) => {
    if (typeof v1 == 'string') return v1.localeCompare(v2) > 0;
    if (typeof v2 == "number") return v1 > v2;
  }

  const isSmaller = (v1, v2) => {
    if (typeof v1 == 'string') return v1.localeCompare(v2) < 0;
    if (typeof v2 == "number") return v1 < v2;
  }

  const quickSort = (v, indInicio, indFim) => {
    let j = indFim;
    let i = indInicio;
    let pivo = v[Math.floor((indInicio + indFim) / 2)].comparatorValue

    while (i <= j) {
      while (i < indFim && isBigger(v[i].comparatorValue, pivo)) {
        i = i + 1;
      }

      while (j > indInicio && isSmaller(v[j].comparatorValue, pivo)) {
        j = j - 1;
      }

      if (i <= j) {
        const aux = v[i];
        v[i] = v[j];
        v[j] = aux;
        i = i + 1;
        j = j - 1;
      }
    }
    if (indInicio < j) quickSort(v, indInicio, j);
    if (i < indFim) quickSort(v, i, indFim);
  }

  const handleDiscardChanges = () => {
    setIsTimerModalOpen(false);
    toast.success("Descartando alterações...");
    setModifiedChamados([]);
    queue.current.clear();
    setUndoing(true);
    processDiscardStack();
  };

  const processDiscardStack = () => {
    if (!stack.current.isEmpty()) {
      const id = stack.current.pop();
      handleMudarChamado(id);
      setTimeout(processDiscardStack, 500);
    } else setUndoing(false);
  };

  const handleDeleteTipoChamado = (id) => {

    ChamadosService.deleteChamadoTipo(id).then((res) => {
      if (res.status === 204) {
        toast.success('Deletado com sucesso');
        loadTiposChamados();
      }
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  }

  const handleCheckboxChange = (value) => {
    setFormTipoChamado({
      ...formTipoChamado,
      prioridade: formTipoChamado.prioridade === value ? null : value,
    });
  };

  const setTipo = (value) => {
    setFormTipoChamado({
      ...formTipoChamado,
      tipo: value
    });
  }

  const createChamadoTipo = () => {
    ChamadosService.postChamadoTipo(formTipoChamado).then(
        (res) => {
          toast.success('Criado com sucesso!');
          console.log(res);
          setTiposChamados([
              ...tiposChamados,
              res.data
          ]);
        }
    ).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
    <HeaderBar title={"Chamados Abertos"}/>
    <Box sx={{ p: 5 }}>
      <TimerModal
          open={isTimerModalOpen}
          onPositiveClose={handleSubmit}
          onNegativeClose={handleDiscardChanges}
          mainText={"Os chamados serão finalizados em %s segundos. Realmente deseja finaliza-los?"}
          initialTimer={15}
      ></TimerModal>

      <Modal open={isModalGerenciarTiposOpen} onClose={() => closeGerenciarTiposModal()}>
        <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              textAlign: "center",
              width: "90%",
              maxWidth: "600px",
            }}
        >
          <IconButton
              onClick={closeGerenciarTiposModal}
              color="white"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
          >
            <CloseIcon />
          </IconButton>
          <TableContainer
              sx={{
                maxHeight: 250,
                overflowY: 'auto',
              }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Tipo</strong></TableCell>
                  <TableCell><strong>Prioridade</strong></TableCell>
                  <TableCell><strong>Ações</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tiposChamados?.map((row) => (
                    <TableRow>
                      <TableCell>{row.tipo}</TableCell>
                      <TableCell>{row.prioridade}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDeleteTipoChamado(row.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ marginTop: '20px' }}>
            <TextField
                label="Tipo"
                onChange={(e) => setTipo(e.target.value)}
                fullWidth
                variant="outlined"
            />

            <div style={{ marginTop: '10px' }}>
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={formTipoChamado.prioridade === 3}
                        onChange={() => handleCheckboxChange(3)}
                        name="alta"
                    />
                  }
                  label="3 - Alta"
              />
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={formTipoChamado.prioridade === 2}
                        onChange={() => handleCheckboxChange(2)}
                        name="media"
                    />
                  }
                  label="2 - Média"
              />
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={formTipoChamado.prioridade === 1}
                        onChange={() => handleCheckboxChange(1)}
                        name="baixa"
                    />
                  }
                  label="1 - Baixa"
              />
            </div>

            <Button
                onClick={() => createChamadoTipo()}
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
            >
              Criar novo tipo de chamado
            </Button>
          </div>
        </Box>
      </Modal>
      <FormControl sx={{ mb: 3, width: '25%' }}>
        <InputLabel id="order-label">Ordenar por:</InputLabel>
        <Select
          labelId="order-label"
          value={selectValue}
          onChange={handleSelectChange}
          label="Ordenar por:"
          variant="outlined"
        >
          <MenuItem value={0}>Prioridade</MenuItem>
          <MenuItem value={1}>Categoria em ordem alfabética</MenuItem>
          <MenuItem value={2}>Descrição em ordem alfabética</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Prioridade</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sala</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Professor</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Categoria</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Atendido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((chamado) => (
                <TableRow key={chamado.id} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' } }}>
                  <TableCell align="center">
                    <Box
                      sx={{
                        width: 15,
                        height: 15,
                        borderRadius: "50%",
                        backgroundColor: chamado.prioridade >= 3 ? "red" : chamado.prioridade > 1 ? "orange" : "green",
                        mx: "auto",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ p: 1, borderRadius: 1 }}>G1A</Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ p: 1, borderRadius: 1 }}>{chamado.responsavel.nome}</Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ p: 1, borderRadius: 1 }}>{chamado.tipo.tipo}</Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ p: 1, borderRadius: 1 }}>{chamado.descricao}</Box>
                  </TableCell>
                  <TableCell align="center">
                  <IconButton
                      onClick={() => handleMudarChamado(chamado.id)}
                      color={chamado.finalizado ? "success" : "error"}
                      aria-label="Concluir chamado"
                    >
                      {chamado.finalizado ? <CheckIcon /> : <CloseIcon sx={{ color: 'red' }} />}
                    </IconButton>
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3, fontStyle: "italic" }}>
                  Nenhum chamado encontrado
                </TableCell>
              </TableRow>
            )}
            {isModalOpen && (
          <div class="modal-overlay">
            <div class="modal-content">
              <div className='flex flex-row-reverse'>
                <button onClick={closeModal} className="close-modal-btn">
                  <CloseIcon fontSize="large" />
                </button>
              </div>

              <div className="flex justify-center items-center mr-12 bg-white-gray w-6 h-6">
                <div class='red-dot'></div>
              </div>
              <div>
              <td className="p-3">
                <div className="bg-white p-2 rounded-md">Sala: G1A</div>
              </td>
              </div>
              <div>
              <td className="p-3">
                <div className="bg-white p-2 rounded-md">Professor: Caique de Andrade</div>
              </td>
              </div>
              <div>
              <td className="p-3">
                <div className="bg-white p-2 rounded-md">Categoria: </div>
              </td>
              </div>
              <div>
              <td className="p-3">
                <div className="bg-white p-2 rounded-md">Descrição: </div>
              </td>
              </div>
              <div>
              <td className="p-3 flex flex-row-reverse">
                <button onClick={closeModal} class='btn-interativo'>Concluir</button>
              </td>
              </div>

            </div>

          </div>
        )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={handleSaveChanges}
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        sx={{ mt: 2 }}
        disabled={modifiedChamados.length < 1 || undoing}
      >
        Salvar Alterações
      </Button>
      <IconButton
          onClick={() => openGerenciarTiposModal()}
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
            mt: 2,
            ml: 2,
          }}
      >
        <AddIcon sx={{ color: '#4169e1' }} />
      </IconButton>
    </Box>
    </div>
    
  );
};

export default ChamadosSecretaria;
