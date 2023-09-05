import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography, Link, Container } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth"


const Signup = () => {
    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const { signup } = useAuth();
  
    const handleSignup = (event) => {
        event.preventDefault()
        const login= {email,senha}
        axios.post("http://localhost:3005/logins/cadastrar",login)
        .then((response)=>{
            alert(`usuário adicionado com sucesso!`)
            navigate("/")
        });


      if (!email | !emailConf | !senha) {
        setError("Preencha todos os campos");
        return;
      } else if (email !== emailConf) {
        setError("Os e-mails não são iguais");
        return;
      }
  
      const res = signup(email, senha);
  
      if (res) {
        setError(res);
        return;
      }
  
      alert("Usuário cadatrado com sucesso!");
      navigate("/");
    };  

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
                onSubmit={handleSignup}
            >
                <Typography
                    component="h1"
                    variant="h5"
                >
                    Sign Up
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
                    value = {email}
                    onChange={(event)=>[setEmail(event.target.value), setError("")]}
                />

                <TextField
                    required
                    margin="normal"
                    fullWidth

                    label="Confirme seu Endereço de E-mail"
                    id="emailConf"
                    name="emailConf"
                    type="emailConf"
                    value={emailConf}
                    onChange={(event) => [setEmailConf(event.target.value), setError("")]}
                />  

                <TextField
                    required
                    margin="normal"
                    fullWidth

                    label="senha"
                    id="password"
                    name="password"
                    type="password"
                    value= {senha}
                    onChange={(event)=>[setSenha(event.target.value), setError("")]}

                />
                <labelError>{error}</labelError>
                <Button
                    fullWidth
                    type="submit"
                    variante="contained"
                    onClick={handleSignup}
                    sx={{
                        mt:2,mb:2 //my:2
                    }}
                >
                    Sign Up
                </Button>
                
                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"center",
                        width:"100%"
                    }}
                >
                    <Link
                        underline="none"
                        href="/"
                    >
                    Já possui conta? Entre
                    </Link>
                </Box>

            </Box>
                
         </Container>
    )
}

export default Signup