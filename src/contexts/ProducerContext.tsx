import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../services/api';

export interface Producer {
  id?: number;
  cpf_cnpj: string;
  name: string;
  farm_name: string;
  city: string;
  state: string;
  total_area: number;
  cultivable_area: number;
  vegetation_area: number;
  crops: string[];
}
interface ProducerContextType {
  producers: Producer[];
  addProducer: (producer: Producer) => void;
  updateProducer: (producer: Producer) => void;
  deleteProducer: (id: number) => void;
  fetchProducers: () => void;
}

const ProducerContext = createContext<ProducerContextType | undefined>(undefined);

export const ProducerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [producers, setProducers] = useState<Producer[]>([]);

  const fetchProducers = async () => {
    try {
      const response = await api.get('/producers');
      setProducers(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtores', error);
    }
  };

  const addProducer = async (producer: Producer) => {
    try {
      const response = await api.post('/producers', producer);
      setProducers((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar produtor', error);
    }
  };

  const deleteProducer = async (id: number) => {
    try {
      await api.delete(`/producers/${id}`);
      setProducers((prev) => prev.filter((producer) => producer.id !== id));
    } catch (error) {
      console.error('Erro ao deletar produtor', error);
    }
  };

  const updateProducer = async (updatedProducer: Producer) => {
    try {
      const response = await api.put(`/producers/${updatedProducer.id}`, updatedProducer);
      setProducers((prev) => prev.map((producer) => 
        producer.id === updatedProducer.id ? response.data : producer
      ));
    } catch (error) {
      console.error('Erro ao atualizar produtor', error);
    }
  };

  useEffect(() => {
    fetchProducers();
  }, []);

  return (
    <ProducerContext.Provider value={{ producers, addProducer, deleteProducer, updateProducer, fetchProducers }}>
      {children}
    </ProducerContext.Provider>
  );
};

export const useProducer = () => {
  const context = useContext(ProducerContext);
  if (!context) {
    throw new Error('useProducer must be used within a ProducerProvider');
  }
  return context;
};
