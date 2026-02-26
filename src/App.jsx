import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuscadorTalento from './pages/BuscadorTalento';
import BuscadorTrabajos from './pages/BuscadorTrabajos';
import DashboardTalento from './pages/DashboardTalento';
import DashboardCliente from './pages/DashboardCliente';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas de Dashboard */}
        <Route path="/dashboard-estudiante" element={<DashboardTalento />} />
        <Route path="/dashboard-empresa" element={<DashboardCliente />} />

        {/* Rutas de Exploración */}
        <Route path="/talentos" element={<BuscadorTalento />} />
        <Route path="/trabajos" element={<BuscadorTrabajos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;