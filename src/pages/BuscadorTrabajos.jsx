import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function BuscadorTrabajos() {
    const [trabajos, setTrabajos] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${API_URL}/api/jobs`);
                const data = await response.json();
                setTrabajos(data);
            } catch (err) {
                console.error("Error cargando trabajos:", err);
            }
        };
        fetchJobs();
    }, [API_URL]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <main className="max-w-6xl mx-auto w-full px-4 py-8">
                <div className="flex flex-col gap-6">
                    {trabajos.map((trabajo) => (
                        <div key={trabajo.id} className="bg-white border border-slate-200 rounded-[2rem] p-8 hover:shadow-lg transition-all relative flex flex-col md:flex-row gap-8 shadow-sm">
                            <div className="flex-grow">
                                <div className="project-header mb-3">
                                    <h2 className="text-[22px] font-black text-violet-700 hover:underline cursor-pointer leading-tight">{trabajo.title}</h2>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase mt-2">{trabajo.job_type}</p>
                                </div>
                                <div className="text-[15px] text-slate-600 leading-relaxed mb-6"><p>{trabajo.description}</p></div>
                                <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold border-2 border-white">
                                        {trabajo.employer_id}
                                    </div>
                                    <span className="text-[15px] font-bold text-slate-800 uppercase tracking-widest">Empresa Verificada</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-between min-w-[200px] md:border-l md:border-slate-100 md:pl-8">
                                <div className="w-full text-right">
                                    <button className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-2xl text-sm hover:bg-violet-600 transition-all shadow-md active:scale-95 mb-6 uppercase tracking-widest">Enviar Propuesta</button>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[22px] font-black text-slate-800 tracking-tight leading-none">{trabajo.budget}</span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Presupuesto</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {trabajos.length === 0 && <p className="text-center py-20 text-slate-400 font-bold italic uppercase tracking-widest">No hay proyectos disponibles en este momento.</p>}
                </div>
            </main>
        </div>
    );
}