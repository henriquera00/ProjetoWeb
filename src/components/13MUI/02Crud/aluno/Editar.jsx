import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const EditarAluno = () => {

    let { id } = useParams()
    const navigate = useNavigate()

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState("0.0")

    function handleSubmit(event) {
        event.preventDefault()
        const aluno = {nome,curso,ira}
        axios.put(`http://localhost:3005/alunos/atualizar/${id}`,aluno)
        .then((response)=>{
            navigate("/listarAluno")
        })
        .catch(error=>console.log(error))
        /*console.log(nome)
        console.log(curso)
        console.log(titulacao)
        console.log(ai)*/
    }

    /*const alunos = [
        { id: 0, nome: "Vito Corleone", curso: "SI", IRA: "10" },
        { id: 1, nome: "Michael Corleone", curso: "DD", IRA: "8.3" },
        { id: 2, nome: "Luca Brasi", curso: "SI", IRA: "4.6" },
        { id: 3, nome: "Kay Adams", curso: "SI", IRA: "7.7" },
        { id: 4, nome: "Peter Clemenza", curso: "CC", IRA: "8.8" }
    ]

    function getAlunoById(id) {
        for(let i=0;i<alunos.length;i++)
            if(id == alunos[i].id) return alunos[i]
        return null
    }*/
    //Como [] esta vazio, o useEffect funciona como um construtor
    useEffect(
        () => {
            //let professor = getProfessorById(id)
            axios.get(`http://localhost:3005/alunos/recuperar/${id}`)
                .then(
                    (response) => {
                        setNome(response.data.nome)
                        setCurso(response.data.curso)
                        setIra(response.data.ira)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )
    return(
        <>
        <Typography variant="h5" fontWeight="bold" >
            Editar Aluno
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
                    value={nome}
                    onChange={(event)=>setNome(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="curso"
                    name="curso"
                    label="Curso"
                    value={curso}
                    onChange={(event)=>setCurso(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ira"
                    label="IRA"
                    name="ira"
                    value={ira}
                    type="number"
                    inputProps={{
                        maxLength: 10,
                        step: "0.1"
                    }}
                    onChange={(e) => setIra(parseFloat(e.target.value))}

                />
                <Box
                sx={{display:"flex",justifyContent:"center",mt:3,mb:2}}
                >
                <Button
                type="submit"
                variant="contained"
                >
                    Atualizar
                </Button>
                </Box>
            </Box>
        </>
    )
}

export default EditarAluno