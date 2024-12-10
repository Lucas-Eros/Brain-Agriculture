import React, { useState } from 'react';
import { Typography } from '@mui/material';
import ProducerForm from '../components/ProducerForm';

const Cadastro: React.FC = () => {
  const [openForm, setOpenForm] = useState(true);

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Cadastro de Produtores</Typography>
      {openForm && <ProducerForm onClose={() => setOpenForm(false)} />}
    </div>
  );
};

export default Cadastro;
