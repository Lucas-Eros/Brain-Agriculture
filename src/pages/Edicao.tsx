import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import ProducerForm from '../components/ProducerForm';

const Edicao: React.FC = () => {
  const location = useLocation();
  const producerToEdit = location.state?.producer;
  const [openForm, setOpenForm] = useState(true);

  return (
    <div>
    <Typography variant="h5" style={{ marginBottom: '20px' }}>Edicao de Produtores</Typography>
    {openForm && <ProducerForm onClose={() => setOpenForm(false)} producerToEdit={producerToEdit} />}
  </div>
  );
};

export default Edicao;
