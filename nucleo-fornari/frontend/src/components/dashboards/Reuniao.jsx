import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


function Reuniao(props){

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
      };
    
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };    
    
      const handleChangeSelect = (event) => {
        setMotivo(event.target.value);
        setErrors((prev) => ({ ...prev, motivo: "" }));
      };
    
      const handleChangeRadio = (event) => {
        setTurno(event.target.value);
        setErrors((prev) => ({ ...prev, turno: "" }));
      };

      const [motivo, setMotivo] = useState("");
      const [turno, setTurno] = useState("");
      const [descricao, setDescricao] = useState("");
      const [errors, setErrors] = useState({ motivo: "", turno: "", descricao: "" });
    
      function createData(tipo, data, sitacao, resposta) {
        return { tipo, data, sitacao, resposta };
      }
    
      const rows = [
        createData("Documentação", "24/05/2024", "Respondida", "Reunião Marcada"),
        createData(
          "Administrativo",
          "29/09/2024",
          "Não Respondida",
          "Sem Resposta"
        ),
      ];

    return(
        <div className="flex flex-col p-12">
        
          <div className="tabela">
            <h1><b>Reuniões Solicitadas</b></h1><br />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                  <TableRow className="bg-blue-main">
                    <TableCell sx={{color: "white", fontSize: 20}}>Tipo</TableCell>
                    <TableCell sx={{color: "white", fontSize: 20}} align="center">Data</TableCell>
                    <TableCell sx={{color: "white", fontSize: 20}} align="center">Situação</TableCell>
                    <TableCell sx={{color: "white", fontSize: 20}} align="center">Resposta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow hover role="checkbox"
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.tipo}
                      </TableCell>
                      <TableCell align="center">{row.data}</TableCell>
                      <TableCell align="center">{row.sitacao}</TableCell>
                      <TableCell align="center">{row.resposta}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
  
  
          <div className="w-full flex justify-center p-5">
            <Button variant="contained" onClick={handleOpen}>Solicitar Reunião</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 700 }}>
                  <div className="flex flex-col w-full justify-center items-center bg-white-ice p-5 rounded-3xl shadow-2xl">
                    <div className="flex flex-col justify-center items-center">
                      <label className="text-3xl mt-5">Motivo da Solicitação</label>
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Motivo
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={motivo}
                          label="Motivo"
                          onChange={handleChangeSelect}
                        >
                          <MenuItem value="">
                            <em>Selecione</em>
                          </MenuItem>
                          <MenuItem value={"administrativo"}>
                            Administrativo
                          </MenuItem>
                          <MenuItem value={"documentacao"}>Documentação</MenuItem>
                          <MenuItem value={"denuncia"}>Denúncia</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <label className="text-3xl mt-5">Turno</label>
  
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={turno}
                          onChange={handleChangeRadio}
                        >
                          <FormControlLabel
                            value="manha"
                            control={<Radio />}
                            label="Manhã"
                          />
                          <FormControlLabel
                            value="tarde"
                            control={<Radio />}
                            label="Tarde"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
  
                    <div className="flex flex-col justify-center items-center">
                      <Box
                        component="form"
                        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                        noValidate
                        autoComplete="off"
                      >
                        <div className="mt-5">
                          <TextField
                            id="outlined-multiline-static"
                            label="Descreva"
                            multiline
                            rows={4}
                          />
                        </div>
                      </Box>
                    </div>
  
                    <div className="flex flex-col justify-center items-center mt-5">
                      <Stack direction="row" spacing={2}>
                        <Button variant="contained" endIcon={<SendIcon />}>
                          Solicitar
                        </Button>
                      </Stack>
                    </div>
                  </div>
              </Box>
            </Modal>
          </div>
  
        </div>

    )
}

export default Reuniao;