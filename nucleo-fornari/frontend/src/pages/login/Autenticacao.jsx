import { Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import LoadingScreen from '../../components/loading/Loading';
import UsuarioService from "../../services/UsuarioService";
import {toast} from "react-toastify";

function Autenticacao() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ email: '', senha: '' });
  const locationData = useLocation();
  const {email} = locationData.state || {};
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [disabled, setDisabled] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [codigo, setCodigo] = useState('');

  const handleClick = () => {
    UsuarioService.esqueciSenha(email).then(res => {
      if (res.status === 204) {
        toast.success('Novo código gerado com sucesso!')
        setDisabled(true);
        setTempoRestante(10);
        setTimeout(() => {
          setDisabled(false);
        }, 10000);
      }
    }).catch(error => toast.error(error.response?.data?.message || error.text || "Erro inesperado"));

    const intervalo = setInterval(() => {
      setTempoRestante((tempoAtual) => {
        if (tempoAtual <= 1) {
          clearInterval(intervalo);
          setDisabled(false);
          return 0;
        }
        return tempoAtual - 1;
      });
    }, 1000);
  };

  const handleSubmit = () => {

    if(codigo) {
      UsuarioService.tokenRedefinicaoSenha(codigo).then(res => {
        if(res.status === 204)
          navigate('/login/recuperacao-senha/alterar-senha', {state: {email: email, token: codigo}});
      }).catch(error => toast.error(error.response?.data?.message || error.text || "Erro inesperado"))
    }
  }
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
            padding={'12px'}
          >
            Digite o código que enviamos para o seu email. Caso não encontre,
            verifique a caixa de spam ou solicite um novo código.
          </Typography>
          <TextField
            id="outlined-codigo"
            label="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            variant="outlined"
            sx={{ width: '70%' }}
          />
          <div className="flex gap-2 w-full justify-center flex-col items-center">
            <Button
              variant="outlined"
              sx={{ width: '70%', textTransform: 'capitalize' }}
              disabled={disabled}
              onClick={handleClick}
            >
              Reenviar
              {disabled && (
                <Typography
                  variant="button"
                  sx={{ paddingLeft: '8px' }}
                  textTransform="lowercase"
                >
                  ({tempoRestante}s)
                </Typography>
              )}
            </Button>
            <Button
              variant="contained"
              sx={{ width: '70%', textTransform: 'capitalize' }}
              onClick={handleSubmit}
            >
              Confirmar
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
export default Autenticacao;
