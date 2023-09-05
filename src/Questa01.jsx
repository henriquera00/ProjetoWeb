import React, { useState } from "react";
import { Button, TextField, Alert, Box } from "@mui/material";

const IMCCalculator = () => {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultadoIMC, setResultadoIMC] = useState(null);

  const handlePesoChange = (event) => {
    setPeso(event.target.value);
  };

  const handleAlturaChange = (event) => {
    setAltura(event.target.value);
  };

  const calcularIMC = () => {
    const pesoFloat = parseFloat(peso);
    const alturaFloat = parseFloat(altura);

    if (isNaN(pesoFloat) || isNaN(alturaFloat) || alturaFloat <= 0) {
      setResultadoIMC(null);
      alert("Por favor, insira valores válidos para peso e altura.");
    } else {
      const imc = pesoFloat / (alturaFloat * alturaFloat);
      setResultadoIMC(imc.toFixed(2));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', mt:'10%', mr:'15%', ml:'15%' }}>
      <TextField
        label="Peso (kg)"
        type="number"
        value={peso}
        onChange={handlePesoChange}
      />
      <TextField
        label="Altura (m)"
        type="number"
        value={altura}
        onChange={handleAlturaChange}
      />
      <Button variant="contained" onClick={calcularIMC}>
        OK
      </Button>
      {resultadoIMC !== null && (
        <Alert severity="info">
          O seu IMC é: {resultadoIMC}
        </Alert>
      )}
    </Box>
  );
};

export default IMCCalculator;
