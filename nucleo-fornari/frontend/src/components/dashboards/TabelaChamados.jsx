import { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';
import api from '../../services/api'; // Importe sua instância de API
import ModalChamado from '../modals/chamado/ModalChamado'; // Componente de modal

const columns = [
  { id: 'id', label: 'Código', minWidth: 100 },
  { id: 'descricao', label: 'Descrição', minWidth: 170 },
  { id: 'tipo', label: 'Assunto', minWidth: 170, align: 'right' },
  { id: 'finalizado', label: 'Status', minWidth: 100, align: 'right' },
  { id: 'dtAbertura', label: 'Data', minWidth: 170, align: 'right' },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchChamados = () => {
    api.get(`/chamados`, { params: { idUser: parseInt(sessionStorage.ID) } })
      .then(res => setData(res.data))
      .catch(error => console.error("Erro ao buscar chamados:", error));
  };

  useEffect(() => {
    fetchChamados();
  }, []);

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', paddingTop: '60px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    let value = row[column.id];

                    // Formatação personalizada
                    if (column.id === 'dtAbertura' && value) {

                      value = new Date(value);
                      const formattedDate =
                        `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()} ${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`;
                        value = formattedDate

                    } else if (column.id === 'finalizado') {
                      value = value ? 'Concluído' : 'Em Análise';
                    } else if (column.id === 'tipo') {
                      value = value.tipo;
                    } else if (typeof value === 'object' && value !== null) {
                      value = value.tipo || value.descricao || JSON.stringify(value);
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );

                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={Array.isArray(data) ? data.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div className="flex w-52 py-10 justify-center">
        <Button variant="contained" size="medium" onClick={openModal}>Novo chamado</Button>
      </div>
      <ModalChamado open={isModalOpen} handleClose={closeModal} />
    </>
  );
}