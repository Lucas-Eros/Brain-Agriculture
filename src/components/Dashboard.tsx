import React from 'react';
import { useProducer } from '../contexts/ProducerContext';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Dashboard: React.FC = () => {
  const { producers } = useProducer();

  const crops = producers.flatMap(p => p.crops);

  const cropCounts = crops.reduce((acc, crop) => {
    acc[crop] = (acc[crop] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cropData = {
    labels: Object.keys(cropCounts),
    datasets: [
      {
        data: Object.values(cropCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#B1B1B1'],
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Gráfico de Culturas</h3>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
        <div style={{ height:'45%' }}>
          <Pie data={cropData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
