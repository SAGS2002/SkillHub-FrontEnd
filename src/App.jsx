import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuscadorTalento from './pages/BuscadorTalento';
import BuscadorTrabajos from './pages/BuscadorTrabajos';
import DashboardTalento from './pages/DashboardTalento';
import DashboardCliente from './pages/DashboardCliente';
import Login from './components/Login';
import Footer from './components/Footer';
import Perfil from './pages/Perfil';
import Navbar from './components/Navbar';

function AppContent() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Obtenemos el rol de la URL o del localStorage como respaldo
  const currentRole = params.get('role') || localStorage.getItem('user_role') || 'talent';

  // DEFINICIÓN DE RUTAS PÚBLICAS (Sin Navbar global ni Footer global)
  // La Landing Page (/) ya tiene su propia Nav interna.
  const esRutaPublica = ['/', '/login'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Solo mostramos la Navbar si NO es una ruta pública */}
      {!esRutaPublica && <Navbar usuario={currentRole} />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard-estudiante" element={<DashboardTalento />} />
          <Route path="/dashboard-empresa" element={<DashboardCliente />} />
          <Route path="/talentos" element={<BuscadorTalento />} />
          <Route path="/trabajos" element={<BuscadorTrabajos />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </main>

      {/* Solo mostramos el Footer si NO es una ruta pública */}
      {!esRutaPublica && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;