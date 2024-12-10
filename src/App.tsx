import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Header from './components/Header';
import Edicao from './pages/Edicao';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/edicao" element={<Edicao />} />
      </Routes>
    </Router>
  );
};

export default App;
