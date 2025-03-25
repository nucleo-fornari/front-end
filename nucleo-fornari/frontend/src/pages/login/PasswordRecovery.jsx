import { Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/loading/Loading';
import UsuarioService from "../../services/UsuarioService";
import {toast} from "react-toastify";

function PasswordRecovery() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ email: '', senha: '' });
  const [email, setEmail] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (email) {
      UsuarioService.esqueciSenha(email).then(res => {
        if (res.status === 204) {
          navigate('/login/recuperacao-senha/autenticacao', {
            state: {email: email}
          });
        }
      }).catch(error => toast.error(error.response?.data?.message || error.text || "Erro inesperado"))
    }
  }

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <form className="rounded-2x1 w-3/5 gap-8 flex flex-col justify-center items-center">
          <h2 className="lg:text-5xl md:text-4xl text-blue-main">
            Recuperação de senha
          </h2>
          <Typography variant="body1" color="#1e2025">
            Por favor, informe o e-mail associado a sua conta que te enviaremos
            um link com as intruções para recuperar sua senha.
          </Typography>
          <TextField
            id="outlined-email"
            label="Email"
            variant="outlined"
            fullWidth={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <Button
            sx={{ textTransform: 'capitalize' }}
            variant="contained"
            fullWidth={true}
            onClick={() => handleSubmit()}
          >
            {' '}
            Continuar{' '}
          </Button>
        </form>
      )}
    </>
  );
}

export default PasswordRecovery;
