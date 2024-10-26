import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container 
      maxWidth="sm" 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" component="h1" color="error" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h6" component="p" color="textSecondary" gutterBottom>
        A página que você está procurando não existe.
      </Typography>
      <Box mt={4} display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;

