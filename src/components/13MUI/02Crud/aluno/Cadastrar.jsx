import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CadastrarAluno = () => {

    const [nome, setNome] = useState("")
    const [curso,setCurso] = useState("GRAD") //select
    const [ira, setIra] = useState("0.0")

    let navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
        const aluno= {nome,curso,ira}
        axios.post("http://localhost:3005/alunos/cadastrar",aluno)
        .then((response)=>{
            alert(`Aluno ID ${response.data._id} adicionado com sucesso!`)
            navigate("/ListarAluno")
        })
        .catch(error=>console.log(error))

    }


    return(
        <>
        <Typography variant="h5" fontWeight="bold" >
            Cadastrar Aluno
        </Typography>
            <Box
            sx={{width:"80%"}}
            component="form"
            onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    id="nome"
                    name="name"
                    label="Nome Completo"
                    onChange={(event)=>setNome(event.target.value)}
                />
                <FormControl sx={{marginTop:2, width:"100%"}} required>
                    <InputLabel id="select-tit-label">Curso</InputLabel>
                    <Select
                        labelId="select-tit-label"
                        label="Curso"
                        value={curso}
                        onChange={(event)=>setCurso(event.target.value)}
                    >
                        <MenuItem value="DD">Design Digital</MenuItem>
                        <MenuItem value="CC">Ciência da Computação</MenuItem>
                        <MenuItem value="SI">Sistema de Informação</MenuItem>
                        <MenuItem value="ES">Engenharia de Software</MenuItem>
                        <MenuItem value="EC">Engenharia da Computação</MenuItem>
                        <MenuItem value="RC">Rede de Computadores</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ira"
                    label="IRA"
                    name="ira"
                    type="number"
                    inputProps={{
                        maxLength: 10,
                        step: "0.1"
                    }}
                    onChange={(e) => setIra(parseFloat(e.target.value))}

                />
                <Box
                sx={{display:"flex",justifyContent:"center",mt:3}}
                >
                <Button
                type="submit"
                variant="contained"
                >
                    Cadastrar
                </Button>
                </Box>
            </Box>
        </>
    )
}

export default CadastrarAluno