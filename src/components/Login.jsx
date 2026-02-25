import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí React se comunica invisiblemente con el "cuarto de máquinas" de Django
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardamos el pase VIP (Token)
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        onLoginSuccess(); // Le avisamos a App.jsx que ya podemos entrar
      } else {
        setError('Credenciales incorrectas. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-purple-100">
        
        {/* Logo de tu proyecto */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-violet-200">
            S
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-center text-slate-800 mb-2">Bienvenido</h2>
        <p className="text-center text-slate-500 mb-8 font-medium">Ingresa para tu prueba técnica</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input 
              type="text" 
              placeholder="Usuario" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-slate-50 text-slate-700 rounded-2xl outline-none border-2 border-transparent focus:border-violet-500 focus:bg-white transition-all font-medium" 
              required
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-slate-50 text-slate-700 rounded-2xl outline-none border-2 border-transparent focus:border-violet-500 focus:bg-white transition-all font-medium" 
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
          
          <button 
            type="submit" 
            className="w-full bg-violet-600 text-white font-bold text-lg py-4 rounded-2xl hover:bg-violet-700 active:scale-95 shadow-lg shadow-violet-200 transition-all mt-4">
            Ingresar al Portal
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;