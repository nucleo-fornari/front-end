import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/loading/Loading';

function ChangePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
            fullWidth={true}
          />
          <TextField
            id=""
            label="Confirme a nova senha"
            variant="outlined"
            fullWidth={true}
          />
          <Button
            variant="contained"
            fullWidth={true}
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
