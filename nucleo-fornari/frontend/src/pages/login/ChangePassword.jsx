import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import LoadingScreen from '../../components/loading/Loading';
import UsuarioService from "../../services/UsuarioService";
import {toast} from "react-toastify";

function ChangePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');
  const locationData = useLocation();
  const {token, email} = locationData.state || {};
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
      if(senha !== senha2) {
        toast.error('As senhas devem ser iguais');
        return;
      }

      UsuarioService.redefinicaoSenha(email, senha, token).then(res => {
        if(res.status === 204) {
          toast.success("Senha redefinida com sucesso!");
          setTimeout(() => navigate('/login'), 3000);
        }
      }).catch(error => toast.error(error.response?.data?.message || error.text || "Erro inesperado"));
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <form className="rounded-2x1 w-3/5 gap-8 flex flex-col justify-center items-center">
          <h2 className="lg:text-5xl md:text-4xl text-blue-main">
            Redefinir senha
          </h2>
          <TextField
            id=""
            label="Digite a nova senha"
            variant="outlined"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            fullWidth={true}
          />
          <TextField
            id=""
            label="Confirme a nova senha"
            value={senha2}
            onChange={e => setSenha2(e.target.value)}
            variant="outlined"
            fullWidth={true}
          />
          <Button
            variant="contained"
            fullWidth={true}
            onClick={handleSubmit}
            sx={{ textTransform: 'capitalize' }}
          >
            {' '}
            Confirmar{' '}
          </Button>
          {/* redirecionar para o login após aparecer o toast confirmando que deu certo a alteração de senha  */}
        </form>
      )}
    </>
  );
}
export default ChangePassword;
