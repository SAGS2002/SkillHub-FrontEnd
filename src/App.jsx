import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuscadorTalento from './pages/BuscadorTalento';
import BuscadorTrabajos from './pages/BuscadorTrabajos';
import DashboardTalento from './pages/DashboardTalento';
import DashboardCliente from './pages/DashboardCliente';
import Login from './components/Login';
import Footer from './components/Footer';
import Perfil from './pages/Perfil';

// Creamos un componente envoltorio para manejar la lógica de visibilidad
function AppContent() {
  const location = useLocation();

  // Definimos en qué rutas NO queremos que aparezca el footer
  const rutasSinFooter = ['/login'];
  const mostrarFooter = !rutasSinFooter.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
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

      {/* Solo se renderiza si mostrarFooter es true */}
      {mostrarFooter && <Footer />}
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