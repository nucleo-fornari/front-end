import { useEffect, useState } from "react";
import LoadingScreen from "../../components/loading/Loading";
import { Button, Stack, TextField, Typography } from "@mui/material";

function Autenticacao() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ email: "", senha: "" });
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [disabled, setDisabled] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(0);

  const handleClick = () => {
    setDisabled(true);
    setTempoRestante(10);
    setTimeout(() => {
      setDisabled(false);
    }, 10000);

    const intervalo = setInterval(() => {
      setTempoRestante((tempoAtual) => {
        if (tempoAtual <= 1) {
          clearInterval(intervalo); // Para o contador quando chega a 0
          setDisabled(false);
          return 0;
        }
        return tempoAtual - 1; // Decrementa o contador
      });
    }, 1000);
  };
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <form className="rounded-2x1 w-3/5 gap-8 flex flex-col justify-center items-center">
          <h2 className="lg:text-5xl md:text-4xl text-blue-main">
            Confirme o código
          </h2>
          <Typography
            variant="body1"
            color="#1e2025"
            textAlign="center"
            padding={"12px"}
          >
            Digite o código que enviamos para o seu email. Caso não encontre,
            verifique a caixa de spam ou solicite um novo código.
          </Typography>
          <TextField
            id="outlined-codigo"
            label="Código"
            variant="outlined"
            sx={{ width: "50%" }}
          />
          <div className="flex gap-2 w-full justify-center flex-col items-center">
            <Button
              variant="outlined"
              sx={{ width: "50%" }}
              disabled={disabled}
              onClick={handleClick}
            >
              Reenviar
              {disabled && (
                <Typography
                  variant="button"
                  sx={{ paddingLeft: "8px" }}
                  textTransform="lowercase"
                >
                  ({tempoRestante}s)
                </Typography>
              )}
            </Button>
            <Button variant="contained" sx={{ width: "50%" }}>
              Confirmar
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
export default Autenticacao;
