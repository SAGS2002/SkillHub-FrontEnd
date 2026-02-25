import React, { useState } from 'react';

function App() {
  const [employee] = useState({
    name: "NeidLord",
    role: "Senior Full Stack Developer",
    match: 85,
    skills: [
      { name: "Python", actual: 4, target: 5 },
      { name: "React", actual: 5, target: 4 },
      { name: "SQL", actual: 3, target: 4 },
      { name: "Docker", actual: 2, target: 4 },
      { name: "Liderazgo", actual: 4, target: 3 },
    ]
  });

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-800 font-sans">
      {/* Navbar con el estilo que te gustó */}
      <nav className="bg-white border-b border-purple-100 px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg shadow-lg flex items-center justify-center text-white font-black italic">S</div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">Skill<span className="text-violet-600">Hub</span></span>
        </div>
        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-xs uppercase border border-violet-200">NL</div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Análisis de Capacidades</h1>
          <p className="text-slate-500 mt-2 text-lg">Comparativa visual de competencias internas vs. requerimientos del puesto.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Tarjeta de Perfil Lateral */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-violet-600 to-purple-800 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-purple-200 sticky top-24">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl mb-6 flex items-center justify-center text-4xl border border-white/30 shadow-inner">👤</div>
              <h2 className="text-3xl font-extrabold mb-1 tracking-tight">{employee.name}</h2>
              <p className="text-violet-200 font-medium text-lg mb-8">{employee.role}</p>
              
              <div className="bg-black/20 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between text-xs font-black uppercase mb-3 tracking-widest">
                  <span>Match de Puesto</span>
                  <span className="text-green-300">{employee.match}%</span>
                </div>
                <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-300 h-full rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: `${employee.match}%` }}></div>
                </div>
              </div>
              
              <button className="w-full mt-10 bg-white text-purple-700 font-black py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-95 tracking-wide uppercase text-sm">
                Asignar Formación
              </button>
            </div>
          </div>

          {/* Panel Central: Gráfico de Barras Comparativas (Sustituye al Radar) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-purple-50 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold text-slate-800">Mapa de Habilidades</h3>
                <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-1.5 text-violet-600"><span className="w-2.5 h-2.5 bg-violet-600 rounded-full"></span> Actual</span>
                  <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2.5 h-2.5 bg-slate-200 rounded-full"></span> Requerido</span>
                </div>
              </div>

              <div className="space-y-8">
                {employee.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-end mb-3">
                      <span className="font-bold text-slate-700 text-lg">{skill.name}</span>
                      <span className="text-sm font-black text-violet-600 bg-violet-50 px-3 py-1 rounded-lg">
                        Nivel {skill.actual} / {skill.target}
                      </span>
                    </div>
                    <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                      {/* Barra de Requerimiento (Fondo gris) */}
                      <div 
                        className="absolute top-0 left-0 h-full bg-slate-200 transition-all duration-1000"
                        style={{ width: `${(skill.target / 5) * 100}%` }}
                      ></div>
                      {/* Barra Actual (Morado con brillo) */}
                      <div 
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg rounded-full transition-all duration-1000 ease-out z-10`}
                        style={{ width: `${(skill.actual / 5) * 100}%` }}
                      >
                        <div className="w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tarjeta de Sugerencia Rápida */}
            <div className="bg-violet-50 p-8 rounded-[2rem] border border-violet-100 flex items-center gap-6">
              <div className="text-4xl">💡</div>
              <div>
                <h4 className="font-bold text-violet-900 text-lg">Recomendación de Upskilling</h4>
                <p className="text-violet-700">El empleado está a solo <strong>2 puntos</strong> de dominar Docker para cumplir el perfil de Tech Lead.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;