
import {Fragment} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container } from "@mui/material"
import MyMenu from "./MyMenuVH"
import Home from "./Home"
import useAuth from './useAuth'
//Páginas Professores
import CadastrarProfessor from "./professor/Cadastrar"
import ListarProfessor from "./professor/Listar"
import EditarProfessor from "./professor/Editar"

//Páginas Alunos
import CadastrarAluno from "./aluno/Cadastrar"
import ListarAluno from "./aluno/Listar"
import EditarAluno from "./aluno/Editar"

//Tela de Login
import Signin from "./Signin01"
import Signup from './Signup01'
import { AuthProvider } from "./auth";

const Private = ({ Item }) => {
    const {signed} = useAuth();

    return signed> 0 ? <Item /> : <Signin />;
};

const MainPage = () => {
    return (
        <BrowserRouter>
        <Fragment>
            <MyMenu />
            <AuthProvider>
            <Container sx={{mt:5,display:"flex",flexDirection:"column",alignItems:"center"}}>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home}/>}/>
                    <Route path="/" element={<Signin/>}/>
                    <Route exact path="/signup" element={<Signup />} />
                    <Route path="cadastrarProfessor" element={<Private Item={CadastrarProfessor}/>}/>
                    <Route path="listarProfessor" element={<Private Item={ListarProfessor}/>}/>
                    <Route path="editarProfessor/:id" element={<Private Item={EditarProfessor}/>}/>

                    <Route path="cadastrarAluno" element={<Private Item={CadastrarAluno}/>}/>
                    <Route path="listarAluno" element={<Private Item={ListarAluno}/>}/>
                    <Route path="editarAluno/:id" element={<Private Item={EditarAluno}/>}/>
                </Routes>
            </Container>
            </AuthProvider>
        </Fragment>
        </BrowserRouter>
    )
}

export default MainPage