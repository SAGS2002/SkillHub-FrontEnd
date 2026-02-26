import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function DashboardCliente() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [misVacantes, setMisVacantes] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchMyJobs = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId || userId === 'null') return;

        try {
            const response = await fetch(`${API_URL}/api/company-jobs/${userId}`);
            const data = await response.json();
            setMisVacantes(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error cargando tus vacantes:", err);
        }
    };

    useEffect(() => {
        fetchMyJobs();
    }, [API_URL]);

    const handleCreateJob = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const jobData = Object.fromEntries(formData);
        jobData.userId = localStorage.getItem('user_id');

        try {
            const response = await fetch(`${API_URL}/api/create-job`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobData),
            });
            if (response.ok) {
                alert("¡Proyecto publicado!");
                setIsModalOpen(false);
                fetchMyJobs(); // Refresco instantáneo
            }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            
            <main className="max-w-7xl mx-auto p-6 w-full flex-grow">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Panel de Reclutamiento</h1>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-violet-600 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl hover:bg-violet-700 transition-all uppercase tracking-widest active:scale-95"
                    >
                        Publicar Nuevo Proyecto +
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h3 className="font-black text-slate-800 mb-8 uppercase text-xs tracking-[0.2em]">Tus Publicaciones Activas</h3>
                            
                            <div className="space-y-4">
                                {misVacantes.map(job => (
                                    <div key={job.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-violet-200 transition-all">
                                        <div className="flex items-center gap-6">
                                            {/* NÚMERO DE POSTULANTES DINÁMICO */}
                                            <div className="w-14 h-14 bg-violet-100 rounded-full flex flex-col items-center justify-center border-2 border-white shadow-sm">
                                                <span className="text-violet-700 font-black text-lg leading-none">{job.total_postulantes}</span>
                                                <span className="text-[7px] text-violet-400 font-black uppercase">Postulantes</span>
                                            </div>
                                            
                                            <div>
                                                <p className="font-black text-slate-900 text-xl leading-tight">{job.title}</p>
                                                <p className="text-xs text-violet-600 font-bold uppercase tracking-wider mt-1">
                                                    {job.job_type} • {job.budget}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="bg-white text-violet-700 px-6 py-2.5 rounded-xl text-xs font-black shadow-sm border border-slate-100 hover:shadow-md transition-all uppercase tracking-tighter">Ver Candidatos</button>
                                    </div>
                                ))}

                                {misVacantes.length === 0 && (
                                    <div className="py-20 text-center">
                                        <p className="text-slate-300 font-black italic uppercase text-lg tracking-widest">No hay vacantes publicadas</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <aside className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl h-fit border border-slate-800 sticky top-28">
                        <h3 className="font-black mb-4 uppercase text-xs tracking-widest text-slate-500">Gestión de Talento</h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                            En esta red nacional, los estudiantes de sistemas de <span className="text-violet-400 font-bold uppercase">IUTEPI</span> son los más buscados.
                        </p>
                    </aside>
                </div>
            </main>

            {/* MODAL DE PUBLICACIÓN */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <form onSubmit={handleCreateJob} className="bg-white rounded-[3rem] w-full max-w-2xl p-10 relative shadow-2xl border border-white animate-in zoom-in-95">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter text-center">Lanzar Publicación</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-full">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-2">Título del Proyecto</label>
                                <input name="title" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-slate-800 focus:ring-2 focus:ring-violet-500 border-none" placeholder="Ej: App Web con Node.js" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-2">Presupuesto</label>
                                <input name="budget" placeholder="Ej: 200$ - 500$" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-slate-800 border-none" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-2">Modalidad</label>
                                <select name="jobType" className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-800 outline-none border-none">
                                    <option>Remoto</option><option>Presencial</option><option>Pasantía</option>
                                </select>
                            </div>
                            <div className="col-span-full">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-2">Descripción</label>
                                <textarea name="description" placeholder="Objetivos del proyecto..." required rows="4" className="w-full p-4 bg-slate-50 rounded-2xl outline-none resize-none font-medium text-slate-600 border-none"></textarea>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-10">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-black text-slate-400 uppercase text-xs tracking-widest">Cancelar</button>
                            <button type="submit" className="flex-1 bg-violet-600 text-white py-4 rounded-2xl font-black shadow-lg uppercase text-xs tracking-widest hover:bg-violet-700 transition-all">Publicar Vacante</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}