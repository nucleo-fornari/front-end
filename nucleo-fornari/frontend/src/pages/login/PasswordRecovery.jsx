import { Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/loading/Loading';

function PasswordRecovery() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ email: '', senha: '' });
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
            error={!!errors.email}
            helperText={errors.email}
          />
          <Button
            sx={{ textTransform: 'capitalize' }}
            variant="contained"
            fullWidth={true}
            onClick={() => navigate('/login/recuperacao-senha/autenticacao')}
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
