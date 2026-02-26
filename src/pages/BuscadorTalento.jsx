import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function BuscadorTalento() {
    const [talentos, setTalentos] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL; // Usando tu variable de entorno

    useEffect(() => {
        const fetchTalent = async () => {
            try {
                const response = await fetch(`${API_URL}/api/talents`); //
                const data = await response.json();
                // Aseguramos que la respuesta sea un arreglo antes de guardarlo
                setTalentos(Array.isArray(data) ? data : []);
            } catch (err) { 
                console.error("Error cargando talentos:", err); 
            }
        };
        fetchTalent();
    }, [API_URL]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            
            <div className="max-w-7xl mx-auto p-6 w-full">
                <header className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Catálogo de Talento</h1>
                    <p className="text-slate-500 font-medium">Encuentra a los mejores estudiantes de sistemas para tus proyectos.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {talentos.map(t => (
                        <div key={t.user_id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-violet-200 transition-all group flex flex-col h-full">
                            {/* CABECERA DE LA TARJETA: NOMBRE Y ROL */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center font-black text-violet-700 border-2 border-white ring-4 ring-violet-50 text-2xl uppercase">
                                    {t.full_name?.substring(0, 1) || 'S'}
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 text-lg leading-none">{t.full_name || 'Estudiante'}</h3>
                                    <p className="text-violet-600 text-[10px] font-black mt-1 uppercase tracking-widest">{t.role_title || 'Talento SkillHub'}</p>
                                </div>
                            </div>

                            {/* INFORMACIÓN ACADÉMICA (Universidad y Semestre si estudia) */}
                            <div className="mb-4">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <span className="text-slate-900">📍 {t.university || 'IUTEPI'}</span>
                                    {t.is_studying && t.semester && (
                                        <>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-violet-500">{t.semester}</span>
                                        </>
                                    )}
                                </p>
                            </div>

                            {/* DESCRIPCIÓN / BIO */}
                            <p className="text-sm text-slate-500 line-clamp-3 mb-6 font-medium leading-relaxed italic">
                                "{t.bio || 'Sin descripción profesional disponible en el perfil.'}"
                            </p>

                            {/* SKILLS DINÁMICAS (Desde el JSONB de PostgreSQL) */}
                            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                {t.skills && Array.isArray(t.skills) && t.skills.length > 0 ? (
                                    t.skills.map((skill, index) => (
                                        <span key={index} className="bg-slate-50 text-slate-500 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase border border-slate-100 italic">
                                            {skill.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-slate-300 text-[10px] font-bold uppercase italic">Sin skills registradas</span>
                                )}
                            </div>

                            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl text-xs font-black uppercase hover:bg-violet-600 transition-all tracking-widest shadow-lg shadow-slate-100 active:scale-95">
                                Ver Perfil Técnico
                            </button>
                        </div>
                    ))}
                    
                    {/* ESTADO VACÍO */}
                    {talentos.length === 0 && (
                        <div className="text-center col-span-full py-20">
                            <p className="text-slate-300 font-black italic text-xl uppercase tracking-widest">Buscando talento en la red...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}