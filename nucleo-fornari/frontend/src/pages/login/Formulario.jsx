import { useEffect, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
// import { useAuth } from "../../AuthProvider";

const Formulario = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', senha: '' });
  // const { user, login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrors({ email: '', senha: '' });

    try {
      const response = await api.post('usuarios/login', {
        email: email,
        senha: senha,
      });

      if (response.status === 200) {
        sessionStorage.TOKEN = response.data.token;
        sessionStorage.FUNC = response.data.funcao;
        sessionStorage.ID = response.data.userId;
        sessionStorage.NOME = response.data.nome;
        sessionStorage.ID_SALA = response.data.salaId;
        redirectByRole(response.data.funcao);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.errors
      ) {
        setErrors({
          email: ' ',
          senha:
            'Email ou senha incorretos. Verifique os dados e tente novamente.',
        });
      } else {
        console.error(error.message || 'Erro inesperado!');
        toast.error('Erro inesperado ao fazer login. Tente novamente.');
      }
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem('ID');
    const func = sessionStorage.getItem('FUNC');

    if (id && func) {
      redirectByRole(func);
    }
  }, []);

  const redirectByRole = (role) => {
    switch (role) {
      case 'RESPONSAVEL':
        navigate('/responsavel');
        break;
      case 'PROFESSOR':
        navigate('/professor');
        break;
      case 'SECRETARIO':
        navigate('/secretaria');
        break;
      default:
        console.log('Erro ao redirecionar para a rota do user');
        break;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="rounded-2x1 w-3/5 gap-8 flex flex-col justify-center items-center p-3"
    >
      <h2 className="lg:text-5xl md:text-4xl text-blue-main">
        Entre com sua conta
      </h2>
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
      <TextField
        id="outlined-password"
        label="Senha"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        fullWidth={true}
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        error={!!errors.senha}
        helperText={errors.senha}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="flex gap-1 w-full justify-center flex-col items-center">
        <Button
          variant="contained"
          fullWidth={true}
          sx={{ textTransform: 'capitalize' }}
        >
          Entrar
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => navigate('/login/recuperacao-senha')}
          sx={{ textTransform: 'initial' }}
        >
          Esqueceu sua senha?
        </Button>
      </div>
    </form>
  );
};
export default Formulario;
