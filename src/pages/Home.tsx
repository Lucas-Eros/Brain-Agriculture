import React from 'react';
import ProducerList from '../components/ProducerList';
import Dashboard from '../components/Dashboard';

const Home: React.FC = () => {
  return (
    <div>
      <ProducerList />
      <Dashboard />
    </div>
  );
};

export default Home
