import React, { useState, useEffect } from 'react';
import { Producer, useProducer } from '../contexts/ProducerContext';
import { Button, TextField, Grid, Typography } from '@mui/material';

interface ProducerFormProps {
  onClose: () => void;
  producerToEdit?: Producer;
}

const ProducerForm: React.FC<ProducerFormProps> = ({ onClose, producerToEdit }) => {
  const { addProducer, updateProducer } = useProducer();
  const [formValues, setFormValues] = useState<Producer>({
    cpf_cnpj: '',
    name: '',
    farm_name: '',
    city: '',
    state: '',
    total_area: 0,
    cultivable_area: 0,
    vegetation_area: 0,
    crops: [],
  });

  useEffect(() => {
    if (producerToEdit) {
      setFormValues({
        ...producerToEdit,
        crops: producerToEdit.crops.join(', '),
      });
    }
  }, [producerToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === 'crops' ? value : value.trim()
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cropsArray = formValues.crops.split(',').map(crop => crop.trim()).filter(Boolean);

    const producerData = {
      ...formValues,
      crops: cropsArray,
      total_area: parseFloat(formValues.total_area as any),
      cultivable_area: parseFloat(formValues.cultivable_area as any),
      vegetation_area: parseFloat(formValues.vegetation_area as any),
    };

    try {
      if (producerToEdit) {
        await updateProducer({ ...producerData, id: producerToEdit.id });
        alert('Produtor atualizado com sucesso!');
      } else {
        await addProducer(producerData);
        alert('Produtor cadastrado com sucesso!');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar produtor:', error);
      alert('Erro ao cadastrar/atualizar produtor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">{producerToEdit ? 'Editar Produtor' : 'Cadastrar Produtor'}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="CPF ou CNPJ"
            name="cpf_cnpj"
            value={formValues.cpf_cnpj}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nome"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nome da Fazenda"
            name="farm_name"
            value={formValues.farm_name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Cidade"
            name="city"
            value={formValues.city}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Estado"
            name="state"
            value={formValues.state}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            label="Área Total (ha)"
            name="total_area"
            value={formValues.total_area}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            label="Área Cultivável (ha)"
            name="cultivable_area"
            value={formValues.cultivable_area}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            label="Área de Vegetação (ha)"
            name="vegetation_area"
            value={formValues.vegetation_area}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Culturas (separadas por vírgula)"
            name="crops"
            value={formValues.crops}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        {producerToEdit ? 'Atualizar' : 'Cadastrar'}
      </Button>
    </form>
  );
};

export default ProducerForm;
