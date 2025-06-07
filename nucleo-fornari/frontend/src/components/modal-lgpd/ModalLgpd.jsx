import { useState } from "react";
import api from "../../services/api";
import { Modal, Box, Checkbox, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function LgpdModal({ open, onAccepted, onClose }) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccept = () => {
    setLoading(true);
    const userId = parseInt(sessionStorage.getItem("ID"));

    api
      .patch(`usuarios/${userId}/lgpd`)
      .then(() => {
        sessionStorage.setItem("LGPD", "true");
        onAccepted();
      })
      .catch((error) => {
        console.error("Erro ao aceitar LGPD:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          bgcolor: "background.paper",
          width: "90%",
          maxWidth: 800,
          height: "90vh",
          borderRadius: 2,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          p: 0,
          outline: "none"
        }}
      >
        {/* Botão Fechar */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Cabeçalho */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          <Typography variant="h6" component="h2" fontWeight="600" color="text.primary">
            Política de Privacidade e Proteção de Dados Pessoais - Núcleo Fornari
          </Typography>
        </Box>

        {/* Conteúdo rolável */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            fontSize: "0.9rem",
            color: "text.secondary",
            "& ul": {
              paddingLeft: 3,
              listStyleType: "disc",
              marginBottom: 2,
            },
            "& strong": {
              fontWeight: "600",
            },
          }}
        >
          <p>
            <strong>1. Introdução</strong>
            <br />
            A presente Política de Privacidade tem como objetivo informar aos usuários do Núcleo
            Fornari como os dados pessoais são coletados, utilizados, armazenados e protegidos em
            conformidade com a LGPD.
          </p>
          <p>
            <strong>2. Dados Pessoais Coletados</strong>
            <br />
            <ul>
              <li>Nome completo, e-mail e telefone para cadastro e comunicação;</li>
              <li>Dados de funcionários e professores (contato e funções);</li>
              <li>Dados essenciais de alunos, como nome e contato dos responsáveis.</li>
            </ul>
          </p>
          <p>
            <strong>3. Finalidade da Coleta de Dados</strong>
            <br />
            <ul>
              <li>Prover acesso ao sistema;</li>
              <li>Comunicação e notificações;</li>
              <li>Gestão administrativa escolar;</li>
              <li>Garantir a segurança e bom funcionamento da plataforma.</li>
            </ul>
          </p>
          <p>
            <strong>4. Compartilhamento de Dados</strong>
            <br />
            <ul>
              <li>Obrigação legal;</li>
              <li>Serviços essenciais com garantia de conformidade à LGPD.</li>
            </ul>
          </p>
          <p>
            <strong>5. Armazenamento de Dados</strong>
            <br />
            Dados armazenados com segurança e por tempo necessário.
          </p>
          <p>
            <strong>6. Direitos dos Titulares</strong>
            <br />
            <ul>
              <li>Confirmar existência de tratamento;</li>
              <li>Acessar e corrigir dados;</li>
              <li>Solicitar anonimização ou eliminação;</li>
              <li>Pedir portabilidade;</li>
              <li>Revogar consentimento.</li>
            </ul>
          </p>
          <p>
            <strong>7. Segurança da Informação</strong>
            <br />
            Adoção de criptografia, controle de acesso e auditorias.
          </p>
          <p>
            <strong>8. Alterações na Política</strong>
            <br />
            Atualizações serão publicadas nesta página.
          </p>
          <p>
            <strong>9. Contato</strong>
            <br />
            Em caso de dúvidas, entre em contato com a secretaria.
          </p>
        </Box>

        {/* Rodapé fixo */}
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="primary"
            />
            <Typography variant="body2" sx={{ userSelect: "none" }}>
              Li e aceito os termos da Política de Privacidade
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!checked || loading}
            onClick={handleAccept}
          >
            {loading ? "Salvando..." : "Aceitar e continuar"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
