import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Perfil() {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'talent';
    const fileInputRef = useRef(null);

    // ESTADOS
    const [roleTitle, setRoleTitle] = useState('Front-end Developer');
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [isStudying, setIsStudying] = useState(true);
    const [profileImage, setProfileImage] = useState("https://ui-avatars.com/api/?name=Sebastian+Gallardo&background=7c3aed&color=fff");
    
    // ESTADO PARA MODAL Y HABILIDADES
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skills, setSkills] = useState([
        { id: 1, name: 'JavaScript', cert: 'No certificada', exp: '1 año' },
        { id: 2, name: 'React', cert: 'Verificada', exp: '6 meses' }
    ]);
    const [newSkill, setNewSkill] = useState({ name: '', cert: 'No certificada', exp: '' });

    // FUNCIONES PARA HABILIDADES
    const addSkill = (e) => {
        e.preventDefault();
        setSkills([...skills, { ...newSkill, id: Date.now() }]);
        setIsModalOpen(false);
        setNewSkill({ name: '', cert: 'No certificada', exp: '' });
    };

    const deleteSkill = (id) => {
        setSkills(skills.filter(skill => skill.id !== id));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setProfileImage(URL.createObjectURL(file));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative">
            <Navbar usuario={role} />

            <main className="max-w-7xl mx-auto w-full p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* COLUMNA IZQUIERDA: Foto de Perfil */}
                <aside className="lg:col-span-3">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center sticky top-28">
                        <div className="relative inline-block">
                            <img src={profileImage} className="w-32 h-32 rounded-full border-4 border-slate-50 shadow-inner mx-auto object-cover" alt="Profile" />
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                            <button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-full text-xs font-bold shadow-lg hover:bg-violet-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            </button>
                        </div>
                        <h3 className="mt-4 font-bold text-slate-900 text-xl">Sebastian Gallardo</h3>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Valencia, Carabobo</p>
                    </div>
                </aside>

                {/* COLUMNA DERECHA: Datos del Perfil */}
                <section className="lg:col-span-9 space-y-6">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-grow">
                                <h1 className="text-3xl font-black text-slate-900 mb-1">Perfil Profesional</h1>
                                <div className="flex items-center gap-3">
                                    {isEditingRole ? (
                                        <div className="flex items-center gap-2 w-full max-w-md">
                                            <input value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} className="bg-slate-50 border-2 border-violet-200 p-2 rounded-xl text-lg font-bold text-violet-700 outline-none w-full" autoFocus />
                                            <button onClick={() => setIsEditingRole(false)} className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-xs uppercase">Listo</button>
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="text-lg font-bold text-violet-600 tracking-tight">{roleTitle}</h2>
                                            <button onClick={() => setIsEditingRole(true)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors">Editar Rol</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CONFIGURACIÓN ACADÉMICA / EMPRESA */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                            {role === 'talent' ? (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Universidad</label>
                                        <input required placeholder="Ej: IUTEPI" className="p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 outline-none focus:ring-2 focus:ring-violet-500" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Estatus</label>
                                        <div className="flex items-center gap-4 py-2">
                                            <input type="checkbox" checked={isStudying} onChange={() => setIsStudying(!isStudying)} className="w-5 h-5 accent-violet-600 rounded" />
                                            <span className="text-sm font-bold text-slate-600 italic">Sigo estudiando actualmente</span>
                                        </div>
                                        {isStudying && (
                                            <input required placeholder="¿Semestre o Año?" className="p-4 bg-violet-50 rounded-2xl border-none font-bold text-violet-700 outline-none animate-in fade-in slide-in-from-top-2 duration-300" />
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="col-span-full">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Ubicación Global de la Empresa</label>
                                    <input required placeholder="Ej: Valencia, Carabobo" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 outline-none focus:ring-2 focus:ring-violet-500" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SOBRE MÍ */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-4">Sobre mí / Resumen</h3>
                        <textarea rows="4" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-slate-600 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-violet-100 resize-none" placeholder="Háblanos de tu carrera técnica o visión empresarial..."></textarea>
                    </div>

                    {/* TABLA DE HABILIDADES TÉCNICAS */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-8 pb-4 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Habilidades destacadas</h3>
                            <button onClick={() => setIsModalOpen(true)} className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-xs font-black hover:bg-violet-600 transition-all uppercase tracking-widest shadow-lg shadow-slate-200">Agregar Skill</button>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-8 py-4">Habilidad</th>
                                    <th className="px-8 py-4">Nivel / Cert.</th>
                                    <th className="px-8 py-4 text-center">Experiencia</th>
                                    <th className="px-8 py-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {skills.map((skill) => (
                                    <tr key={skill.id} className="text-sm font-bold text-slate-700 group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5"><span className="bg-violet-100 text-violet-700 px-3 py-1.5 rounded-xl text-xs">{skill.name}</span></td>
                                        <td className="px-8 py-5 text-slate-400 font-medium italic">{skill.cert}</td>
                                        <td className="px-8 py-5 text-center">{skill.exp}</td>
                                        <td className="px-8 py-5">
                                            <button onClick={() => deleteSkill(skill.id)} className="text-red-400 hover:text-red-600 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {/* MODAL PARA AGREGAR HABILIDADES */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <form onSubmit={addSkill} className="bg-white rounded-[2.5rem] w-full max-w-md p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight">Nueva Habilidad</h2>
                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Nombre de la skill</label>
                                <input required value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-violet-500 font-bold" placeholder="Ej: PostgreSQL" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Experiencia</label>
                                    <input required value={newSkill.exp} onChange={(e) => setNewSkill({...newSkill, exp: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-violet-500 font-bold" placeholder="Ej: 1 año" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Certificación</label>
                                    <select value={newSkill.cert} onChange={(e) => setNewSkill({...newSkill, cert: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-slate-700">
                                        <option>No certificada</option>
                                        <option>Verificada</option>
                                        <option>Certificado IUTEPI</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all uppercase text-xs">Cancelar</button>
                            <button type="submit" className="flex-1 bg-violet-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all uppercase text-xs">Guardar Skill</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}