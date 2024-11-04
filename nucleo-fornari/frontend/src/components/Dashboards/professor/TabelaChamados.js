import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

const columns = [
  { id: 'data', label: 'Data', minWidth: 170 },
  { id: 'codigo', label: 'Código', minWidth: 100},
  { id: 'assunto',label: 'Assunto',minWidth: 170,align: 'right'},
//   { id: 'categoria', label: 'Categoria', minWidth: 170, align: 'right' },
  { id: 'status',   label: 'Status', minWidth: 170, align: 'right' },
];

function createData(data, codigo, assunto, status) {
  
  return { data, codigo, assunto, status };
}

const rows = [
  createData('18/09/2024', 'NF-0123', 'Saúde do Aluno', 'Em análise'),
  createData('02/05/2024', 'NF-0122', 'Suporte de TI', 'Concluído'),
  createData('12/10/2024', 'NF-0125', 'Suporte da gestão', 'Concluído'),
  createData('08/07/2024', 'NF-0128', 'Professor auxiliar', 'Concluído'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    
    <Paper sx={{ width: '100%', overflow: 'hidden', padding:'30px', paddingTop:'60px'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" className='' >
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.codigo}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <div className="flex w-52 py-10 justify-center">

              <Button
              variant="contained"
              size="medium"
              >Novo chamado</Button>
        </div>
            
</>
  );
}

