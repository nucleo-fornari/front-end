import React, {useEffect, useRef, useState} from 'react';
import "./Chamados.css";
import api from "../../services/api";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {Cancel as CloseIcon, CheckCircle as CheckIcon, Save as SaveIcon} from "@mui/icons-material";
import {Queue} from "../../utils/classes/Queue";
import {Stack} from "../../utils/classes/Stack";
import {toast} from "react-toastify";
import TimerModal from "../modals/chamado/TimerModal";

const ChamadosSecretaria = () => {
  const [data, setData] = useState([]);
  const [selectValue, setSelectValue] = useState(0);
  const [ordenated, setOrdenated] = useState(false);
  const [modifiedChamados, setModifiedChamados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const queue = useRef(new Queue());
  const stack = useRef(new Stack());
  const [undoing , setUndoing] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

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

  const restoreChamadoState = (id) => {
    setData((prev) =>
        prev.map((x) => x.id === id ? { ...x, finalizado: false} : x));
  }

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

  const compareString = (str1, str2) => {
    return str1.localeCompare(str2) < 0;
  }

  const compareNumber = (n1, n2) => {
    return n1 < n2;
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


  return (
    <Box sx={{ p: 5 }}>
      <TimerModal
          open={isTimerModalOpen}
          onPositiveClose={handleSubmit}
          onNegativeClose={handleDiscardChanges}
          mainText={"Os chamados serão finalizados em %s segundos. Realmente deseja finaliza-los?"}
          initialTimer={15}
      ></TimerModal>
      <FormControl fullWidth sx={{ mb: 3 }}>
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
    </Box>
  );
};

export default ChamadosSecretaria;
