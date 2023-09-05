import { TableContainer, Typography, Table, Paper, TableHead, TableBody, TableRow, TableCell, Box, FormControlLabel, Checkbox, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ListarAluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [media, setMedia] = useState(0);
  const [mostrarAprovados, setMostrarAprovados] = useState(false);
  const [mostrarReprovados, setMostrarReprovados] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [cursoPesquisa, setCursoPesquisa] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3005/alunos/listar")
      .then((response) => {
        setAlunos(response.data);
        const iras = response.data.map((aluno) => aluno.ira);
        const soma = iras.reduce((acumulador, ira) => acumulador + ira, 0);
        const media = soma / iras.length;
        setMedia(media);
      })
      .catch(error => console.log(error));
  }, []);

  function deleteAlunoById(id) {
    if (window.confirm("Deseja Excluir ? " + id)) {
      axios.delete(`http://localhost:3005/alunos/remover/${id}`)
        .then((response) => {
          const resultado = alunos.filter(prof => prof._id !== id);
          setAlunos(resultado);
        })
        .catch(error => console.log(error));
    }
  }

  function handleExibirReprovados(event) {
    setMostrarReprovados(event.target.checked);
  }

  function handleExibirAprovados(event) {
    setMostrarAprovados(event.target.checked);
  }

  function pesquisarAlunos(aluno) {
    return (
      aluno.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) &&
      (cursoPesquisa === "" || aluno.curso.toLowerCase().includes(cursoPesquisa.toLowerCase()))
    );
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Lista de Alunos
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          marginTop: 16,
          marginBottom: 16
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={mostrarAprovados} onChange={handleExibirAprovados} />}
          label="Exibir apenas aprovados"
        />
        <FormControlLabel
          control={<Checkbox checked={mostrarReprovados} onChange={handleExibirReprovados} />}
          label="Exibir apenas reprovados"
        />
      </div>
      <TextField
        margin="normal"
        fullWidth
        label="Pesquisar por nome"
        id="search"
        name="search"
        type="text"
        value={termoPesquisa} onChange={(event) => setTermoPesquisa(event.target.value)}
        style={{ marginBottom: 16 }}
      />
      <FormControl sx={{marginTop:2, width:"100%"}} fullWidth margin="normal">
        <InputLabel id="curso-label">Pesquisar por curso</InputLabel>
        <Select
          labelId="curso-label"
          id="curso-select"
          value={cursoPesquisa}
          onChange={(event) => setCursoPesquisa(event.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="CC">Ciência da Computação</MenuItem>
          <MenuItem value="DD">Design Digital</MenuItem>
          <MenuItem value="SI">Sistema de Informação</MenuItem>
          <MenuItem value="EC">Engenharia da Computação</MenuItem>
          <MenuItem value="ES">Engenharia de Software</MenuItem>
          <MenuItem value="RD">Rede de Computadores</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper} style={{ marginTop: 16, marginBottom: 16 }}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell>NOME</StyledTableCell>
              <StyledTableCell>CURSO</StyledTableCell>
              <StyledTableCell>IRA</StyledTableCell>
              <StyledTableCell>AÇÕES</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos
              .filter((aluno) => mostrarAprovados ? aluno.ira > media : true)
              .filter((aluno) => mostrarReprovados ? aluno.ira < media : true)
              .filter(pesquisarAlunos)
              .map((aluno) => (
                <StyledTableRow key={aluno._id} IRA={aluno.ira} media={media}>
                  <StyledTableCell style={{ color: aluno.ira < media ? 'red' : 'inherit' }}>{aluno._id}</StyledTableCell>
                  <StyledTableCell style={{ color: aluno.ira < media ? 'red' : 'inherit' }}>{aluno.nome}</StyledTableCell>
                  <StyledTableCell style={{ color: aluno.ira < media ? 'red' : 'inherit' }}>{aluno.curso}</StyledTableCell>
                  <StyledTableCell style={{ color: aluno.ira < media ? 'red' : 'inherit' }}>{aluno.ira}</StyledTableCell>
                  <StyledTableCell>
                    <Box>
                      <IconButton aria-label="edit" color="primary" component={Link} to={`/editarAluno/${aluno._id}`}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" color="error" onClick={() => deleteAlunoById(aluno._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            <StyledTableCell style={{ fontWeight: "bold", backgroundColor: 'black', color: 'white' }}>MÉDIA ARITMÉTICA</StyledTableCell>
            <StyledTableCell>{media.toFixed(2)}</StyledTableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, IRA, media }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  color: IRA < media ? 'red' : 'inherit',
}));

const StyledTableRow02 = styled(TableRow)(({ theme, IRA, media }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.common.black,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  color: theme.palette.common.white,
}));

export default ListarAluno;
