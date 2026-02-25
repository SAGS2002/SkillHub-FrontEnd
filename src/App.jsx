import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/Login'; // Asegúrate de que la ruta coincida con donde tienes tu Login

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: La Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Ruta para iniciar sesión o registrarse */}
        <Route path="/login" element={<Login />} />

        {/* Aquí agregaremos más rutas luego (ej. /dashboard, /talentos) */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;