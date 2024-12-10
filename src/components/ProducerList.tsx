import React from 'react';
import { Producer, useProducer } from '../contexts/ProducerContext';
import { Card, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProducerList: React.FC = () => {
  const { producers, deleteProducer } = useProducer();
  const navigate = useNavigate();

  const handleEdit = (producer: Producer) => {
    navigate('/edicao', { state: { producer } });
  };

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Lista de Produtores</Typography>
      <Grid container spacing={2}>
        {producers.map((producer) => (
          <Grid item xs={12} sm={6} md={4} key={producer.id}>
            <Card style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography variant="h6">{producer.name}</Typography>
              <Typography variant="body1">Fazenda: {producer.farm_name}</Typography>
              <Typography variant="body2">Cidade: {producer.city}</Typography>
              <Typography variant="body2">Estado: {producer.state}</Typography>
              <Typography variant="body2">Área Total: {producer.total_area} ha</Typography>
              <Typography variant="body2">Área Cultivável: {producer.cultivable_area} ha</Typography>
              <Typography variant="body2">Área de Vegetação: {producer.vegetation_area} ha</Typography>
              <Typography variant="body2">Culturas: {producer.crops.join(', ')}</Typography>
              <Button variant="contained" color="primary" onClick={() => handleEdit(producer)}>
                Editar
              </Button>
              <Button variant="contained" color="secondary" onClick={() => deleteProducer(producer.id!)}>
                Excluir
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProducerList;
