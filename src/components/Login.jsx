import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const role = searchParams.get('role') || 'talent';
  const [isRegistering, setIsRegistering] = useState(false);

  const content = {
    talent: {
      regTitle: "¡Crea tu Perfil!",
      regDesc: "Muestra tus habilidades a empresas de todo el país.",
      regButton: "Registrarme como Estudiante",
      welcomeTitle: "¡Hola, Talento!",
      welcomeDesc: "Ingresa para seguir conectado con las mejores oportunidades."
    },
    client: {
      regTitle: "Registra tu Empresa",
      regDesc: "Encuentra a los mejores estudiantes para tus proyectos.",
      regButton: "Registrar mi Empresa",
      welcomeTitle: "Panel de Empresas",
      welcomeDesc: "Accede para gestionar tus vacantes y revisar postulaciones."
    }
  }[role];

  // Función para manejar tanto Login como Registro (Simulado)
  const handleAuth = (e) => {
    e.preventDefault();
    // Aquí el navegador validará automáticamente los campos 'required'
    if (role === 'client') navigate('/dashboard-empresa');
    else navigate('/dashboard-estudiante');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 font-sans p-4 relative">

      {/* BOTÓN VOLVER AL INICIO */}
      <Link
        to="/"
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-all font-bold text-sm group"
      >
        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <span>Volver al inicio</span>
      </Link>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative bg-white w-full max-w-[950px] h-[650px] rounded-[3rem] shadow-2xl overflow-hidden border border-white">

        {/* --- FORMULARIO DE REGISTRO --- */}
        <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-[1] ${isRegistering ? 'translate-x-full opacity-100 z-[5]' : 'opacity-0 pointer-events-none'}`}>
          <form onSubmit={handleAuth} className="bg-white flex flex-col items-center justify-center h-full px-12 text-center space-y-4">
            <h2 className="text-3xl font-black text-slate-800 leading-tight">{content.regTitle}</h2>
            <p className="text-slate-500 text-sm font-medium">{content.regDesc}</p>
            <div className="w-full space-y-3">
              <input type="text" placeholder="Nombre completo" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
              <input type="email" placeholder="Correo institucional" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
              <input type="password" placeholder="Contraseña" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
            </div>
            <button type="submit" className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all active:scale-95 uppercase text-xs tracking-widest">
              {content.regButton}
            </button>
          </form>
        </div>

        {/* --- FORMULARIO DE LOGIN --- */}
        <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-[2] ${isRegistering ? 'translate-x-full opacity-0 pointer-events-none' : ''}`}>
          <form onSubmit={handleAuth} className="bg-white flex flex-col items-center justify-center h-full px-12 text-center space-y-6">
            <div className="flex flex-col items-center mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-200 text-white font-black text-2xl mb-4">S</div>
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">Skill<span className="text-violet-600">Hub</span></h2>
            </div>
            <div className="w-full space-y-4">
              <input type="text" placeholder="Usuario o Email" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-violet-500 transition-all font-medium" />
              <input type="password" placeholder="Contraseña" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-violet-500 transition-all font-medium" />
            </div>
            <button type="submit" className="w-full bg-violet-600 text-white font-bold py-4 rounded-2xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all active:scale-95 uppercase text-xs tracking-widest">
              Ingresar al sistema
            </button>
            <p className="text-slate-400 text-sm hover:text-violet-600 cursor-pointer transition-colors">¿Olvidaste tu contraseña?</p>
          </form>
        </div>

        {/* --- CONTENEDOR DEL OVERLAY --- */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-[100] ${isRegistering ? '-translate-x-full rounded-r-[10rem]' : 'rounded-l-[10rem]'}`}>
          <div className={`bg-gradient-to-br from-violet-600 to-purple-900 text-white relative -left-full h-full w-[200%] transition-all duration-700 ease-in-out ${isRegistering ? 'translate-x-1/2' : 'translate-x-0'}`}>
            <div className="flex h-full">
              {/* Lado Registro */}
              <div className={`absolute flex flex-col items-center justify-center h-full w-1/2 text-center px-12 transition-all duration-700 ${isRegistering ? 'translate-x-0 opacity-100' : '-translate-x-[20%] opacity-0'}`}>
                <h2 className="text-3xl font-black mb-4">¿Ya tienes cuenta?</h2>
                <p className="text-violet-100 text-sm mb-8 opacity-80">{content.welcomeDesc}</p>
                <button onClick={() => setIsRegistering(false)} className="border-2 border-white px-12 py-3 rounded-full font-bold text-xs tracking-widest hover:bg-white hover:text-violet-700 transition-all uppercase">
                  Ir al Login
                </button>
              </div>
              {/* Lado Login */}
              <div className={`absolute right-0 flex flex-col items-center justify-center h-full w-1/2 text-center px-12 transition-all duration-700 ${isRegistering ? 'translate-x-[20%] opacity-0' : 'translate-x-0 opacity-100'}`}>
                <h2 className="text-3xl font-black mb-4">¿Nuevo por aquí?</h2>
                <p className="text-violet-100 text-sm mb-8 opacity-80">Crea tu cuenta en segundos y empieza a explorar las mejores oportunidades universitarias.</p>
                <button onClick={() => setIsRegistering(true)} className="border-2 border-white px-12 py-3 rounded-full font-bold text-xs tracking-widest hover:bg-white hover:text-violet-700 transition-all uppercase">
                  Registrarme
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;