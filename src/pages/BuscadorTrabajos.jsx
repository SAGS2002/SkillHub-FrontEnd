import { Link } from 'react-router-dom';
import { trabajos } from '../data/mockJobs';

export default function BuscadorTrabajos() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Navbar SkillHub con Glassmorphism */}
            <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-purple-100 w-full">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 text-white font-extrabold text-xl">
                            S
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                            Skill<span className="text-violet-600">Hub</span>
                        </span>
                    </div>
                    <Link to="/" className="text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors">
                        Volver al Inicio
                    </Link>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto w-full px-4 py-8">
                <div className="flex flex-col gap-6">
                    {trabajos.map((trabajo) => (
                        <div key={trabajo.id} className="bg-white border border-slate-200 rounded-sm p-6 hover:shadow-lg transition-all relative flex flex-col md:flex-row gap-8 shadow-sm">

                            {/* Bloque Izquierdo: Información del Proyecto */}
                            <div className="flex-grow">
                                <div className="project-header mb-3">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Publicado: {trabajo.publicado}</p>
                                    <h2 className="text-[22px] font-bold text-violet-700 hover:underline cursor-pointer leading-tight">
                                        {trabajo.titulo}
                                    </h2>
                                </div>

                                <div className="flex gap-5 text-[13px] text-slate-500 mb-4 border-b border-slate-50 pb-3">
                                    <span className="flex items-center gap-1 font-medium">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        Propuestas: <strong className="text-slate-700">{trabajo.propuestas}</strong>
                                    </span>
                                </div>

                                <div className="text-[15px] text-slate-600 leading-relaxed mb-6">
                                    <p>
                                        {trabajo.descripcion}...
                                        <span className="text-violet-600 ml-1 font-bold cursor-pointer hover:underline text-sm">Ver más detalles</span>
                                    </p>
                                </div>

                                {/* Skills con la paleta de SkillHub */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {trabajo.habilidades.map(skill => (
                                        <span key={skill} className="bg-violet-50 text-violet-600 text-[11px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider border border-violet-100">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Info del Autor (Empresa/Cliente) */}
                                <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold border-2 border-white ring-2 ring-violet-50">
                                        {trabajo.empresa.substring(0, 2)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[15px] font-bold text-slate-800">{trabajo.empresa}</span>
                                        <div className="flex items-center gap-3 text-[12px] text-slate-500 font-medium">
                                            <span className="flex items-center gap-1">
                                                <img src={`https://flagcdn.com/16x12/${trabajo.ubicacion === 'México' ? 'mx' : 've'}.png`} alt="flag" className="w-4 h-3 rounded-sm" />
                                                {trabajo.ubicacion}
                                            </span>
                                            <span className="text-amber-500 flex items-center gap-0.5">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                {trabajo.rating}
                                            </span>
                                            {trabajo.verificado && (
                                                <span className="text-emerald-600 flex items-center gap-1 font-bold">
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                                                    Verificado
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bloque Derecho: Acciones y Presupuesto */}
                            <div className="flex flex-col items-end justify-between min-w-[200px] md:border-l md:border-slate-100 md:pl-8">
                                <div className="w-full text-right">
                                    <button className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-md text-sm hover:bg-violet-600 transition-all shadow-md active:scale-95 mb-6">
                                        Enviar una propuesta
                                    </button>

                                    <div className="flex flex-col items-end">
                                        <span className="text-[22px] font-black text-slate-800 tracking-tight leading-none">
                                            {trabajo.presupuesto}
                                        </span>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Presupuesto</span>
                                            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <button className="text-[11px] font-bold text-slate-300 hover:text-red-400 transition-colors flex items-center gap-1.5 uppercase tracking-wider mt-4">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    Reportar
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}