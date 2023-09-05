import { Container, AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem } from "@mui/material"
import AdbIcon from "@mui/icons-material/Adb"
import { Link } from "react-router-dom"
import { useState } from "react"
import useAuth from "./useAuth"
import { useNavigate } from "react-router-dom"


const MyMenu = () => {
    const { signout } = useAuth();
  const navigate = useNavigate();
    const [anchorElProfessor,setAnchorElProfessor] = useState(null)
    const handleOpenAnchorElProfessor = (event) => {
        setAnchorElProfessor(event.currentTarget)
    }
    const handleCloseAnchorElProfessor = () => {
        setAnchorElProfessor(null)
    }
    
    const [anchorElAluno,setAnchorElAluno] = useState(null)
    const handleOpenAnchorElAluno = (event) => {
        setAnchorElAluno(event.currentTarget)
    }
    const handleCloseAnchorElAluno = () => {
        setAnchorElAluno(null)
    }

    function droProfMenu(){
        return(
            <box>
                <Button 
                sx={{color:"white", my:2,fontWeight:"800"}}
                onClick={handleOpenAnchorElProfessor}
                >
                    Professores
                </Button>
                <Menu
                    anchorEl={anchorElProfessor}
                    open={Boolean(anchorElProfessor)}
                    onClose={handleCloseAnchorElProfessor}
                >
                    <MenuItem
                        onClick={handleCloseAnchorElProfessor}
                        component={Link}
                        to={"cadastrarProfessor"}
                    >
                        Cadastrar
                    </MenuItem>
                    <MenuItem
                        onClick={handleCloseAnchorElProfessor}
                        component={Link}
                        to={"ListarProfessor"}
                    >
                        Listar
                    </MenuItem>
                </Menu>
            </box>
        )
    }

    function droAlunosMenu(){
        return(
            <box>
                <Button 
                sx={{color:"white", my:2,fontWeight:"800"}}
                onClick={handleOpenAnchorElAluno}
                >
                    Alunos
                </Button>
                <Menu
                    anchorEl={anchorElAluno}
                    open={Boolean(anchorElAluno)}
                    onClose={handleCloseAnchorElAluno}
                >
                    <MenuItem
                        onClick={handleCloseAnchorElAluno}
                        component={Link}
                        to={"cadastrarAluno"}
                    >
                        Cadastrar
                    </MenuItem>
                    <MenuItem
                        onClick={handleCloseAnchorElAluno}
                        component={Link}
                        to={"ListarAluno"}
                    >
                        Listar
                    </MenuItem>
                </Menu>
            </box>
        )
    }


    return(
        <AppBar position="static" 
        sx={{
            backgroundColor:'orange',
        }}
        >
            <Container>
                <Toolbar>
                    <AdbIcon sx={{display:{xs:"none",md:"flex"},mr:0}}/>
                    <Typography
                        variant="h5"
                        component="a"
                        href="/"
                        sx={{
                            textDecoration:"none",
                            color:"white",
                            fontFamily:"monospace",
                            letterSpacing:".3rem",
                            fontWeight:"800",
                        }}
                    >
                        HENRIQUE.SYSTEM
                    </Typography>
                    <Box 
                    sx={{
                        ml:3,width:"100%",
                        display:"flex",
                        justifyContent:"flex-end"
                    }} 
                    >
                        {droProfMenu()}
                        {droAlunosMenu()}
                        

                        <Button
                        sx={{
                            color:"white",
                            my:2,
                            fontWeight:"800"
                        }}
                        onClick={() => [signout(), navigate("/")]}
                        >
                            Log Out
                        </Button>        
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default MyMenu