import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography, Link, Container } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth"
import { Navigate } from "react-router-dom"


const Signin = () =>{

    const {signin} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [error,setError] = useState("")

    const handleLogin = () => {
        if (!email | !senha) {
          setError("Preencha todos os campos");
          return;
        }
    
        const res = signin(email, senha);
    
        if (res) {
          setError(res);
          return;
        }
        navigate("/listarProfessor");
    }

    return(
         <Container maxWidth="sm" >
            <Box
                sx={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    mt:8
                }}
                component="form"
                onSubmit={handleLogin}
            >
                <Typography
                    component="h1"
                    variant="h5"
                >
                    Sign In
                </Typography>
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    autoFocus="true"

                    label="Endereço de E-mail"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event)=>[setEmail(event.target.value), setError("")]}
                />

                <TextField
                    required
                    margin="normal"
                    fullWidth

                    label="senha"
                    id="password"
                    name="password"
                    type="password"
                    value={senha}
                    onChange={(event)=>[setSenha(event.target.value), setError("")]}

                />
                <labelError>{error}</labelError>
                <Button
                    fullWidth
                    type="submit"
                    variante="contained"
                    onClick={handleLogin}
                    sx={{
                        mt:2,mb:2 //my:2
                    }}
                >
                    Sign In
                </Button>
                
                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        width:"100%"
                    }}
                >
                    <Link
                        underline="none"
                        href="#"
                    >
                    Esqueceu a senha?
                    </Link>
                    <Link
                        underline="none"
                        href="/signup"
                        to="/signup"
                    >&nbsp;
                    Não tem uma conta? Cadastre-se
                    </Link>
                </Box>

            </Box>
                
         </Container>
    )
}

export default Signin