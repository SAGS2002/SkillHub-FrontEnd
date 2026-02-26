import React, { useState, useRef, useEffect } from 'react'; //
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Perfil() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL; //
    const role = searchParams.get('role') || 'talent';
    const fileInputRef = useRef(null);

    // --- ESTADOS DE IDENTIDAD ---
    const [nombre, setNombre] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [roleTitle, setRoleTitle] = useState('');
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [profileImage, setProfileImage] = useState(localStorage.getItem('user_photo') || null);

    // --- ESTADOS DE ESTUDIANTE ---
    const [university, setUniversity] = useState('');
    const [isStudying, setIsStudying] = useState(true);
    const [semester, setSemester] = useState('');
    const [skills, setSkills] = useState([]);
    const [description, setDescription] = useState('');

    // --- ESTADOS DE EMPRESA ---
    const [location, setLocation] = useState('');

    // --- ESTADOS MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: '', cert: 'No certificada', exp: '' });

    // 1. CARGAR DATOS DESDE LA BD AL RECARGAR
    useEffect(() => {
        const fetchProfileData = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId || userId === 'null') return;

            try {
                const response = await fetch(`${API_URL}/api/profile/${userId}/${role}`);
                const data = await response.json();

                if (data) {
                    setNombre(role === 'talent' ? data.full_name : data.company_name);
                    setRoleTitle(data.role_title || '');
                    setDescription(data.bio || data.description || '');
                    if (role === 'talent') {
                        setUniversity(data.university || '');
                        setSemester(data.semester || '');
                        setSkills(data.skills || []);
                    } else {
                        setLocation(data.location || '');
                    }
                }
            } catch (err) {
                console.error("Error cargando perfil:", err);
            }
        };
        fetchProfileData();
    }, [API_URL, role]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setProfileImage(base64String);
                localStorage.setItem('user_photo', base64String);
                window.dispatchEvent(new Event('storage'));
            };
            reader.readAsDataURL(file);
        }
    };

    // 2. AGREGAR SKILL (Actualiza estado local)
    const addSkill = (e) => {
        e.preventDefault();
        setSkills([...skills, { ...newSkill, id: Date.now() }]);
        setIsModalOpen(false);
        setNewSkill({ name: '', cert: 'No certificada', exp: '' });
    };

    // 3. BORRAR SKILL (Actualiza estado local)
    const deleteSkill = (id) => {
        setSkills(skills.filter(s => s.id !== id));
    };

    // 4. GUARDADO FINAL EN POSTGRESQL
    const handleFinalSave = async (e) => {
        e.preventDefault();
        const payload = {
            userId: localStorage.getItem('user_id'),
            role,
            nombre,
            roleTitle,
            description,
            ...(role === 'talent' ? { university, isStudying, semester, skills } : { location })
        };

        try {
            const response = await fetch(`${API_URL}/api/update-profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("¡Perfil guardado correctamente en la base de datos!");
                navigate(role === 'client' ? '/dashboard-empresa' : '/dashboard-estudiante');
            } else {
                alert("Error al guardar en el servidor.");
            }
        } catch (error) {
            console.error("Error conectando con el backend:", error);
            alert("No se pudo conectar con el servidor.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <main className="max-w-7xl mx-auto w-full p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* SIDEBAR */}
                <aside className="lg:col-span-3">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-center sticky top-28">
                        <div className="relative inline-block">
                            <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                                {profileImage ? (
                                    <img src={profileImage} className="w-full h-full object-cover" alt="Perfil" />
                                ) : (
                                    <span className="text-slate-300 font-black text-4xl">{role === 'talent' ? 'S' : 'E'}</span>
                                )}
                            </div>
                            <button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-slate-900 text-white p-2.5 rounded-full shadow-xl hover:bg-violet-600 transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                        </div>
                        <h3 className="mt-4 font-black text-slate-900 text-xl">{nombre || "Cargando..."}</h3>
                    </div>
                </aside>

                {/* FORMULARIO */}
                <section className="lg:col-span-9 space-y-6">
                    <form onSubmit={handleFinalSave} className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                            <h1 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Información de Cabecera</h1>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Nombre / Razón Social</label>
                                    <div className="flex items-center gap-3">
                                        {isEditingName ? (
                                            <input value={nombre} onChange={(e) => setNombre(e.target.value)} onBlur={() => setIsEditingName(false)} className="bg-slate-50 p-3 rounded-2xl text-2xl font-black text-slate-900 outline-none w-full border-2 border-violet-100" autoFocus />
                                        ) : (
                                            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setIsEditingName(true)}>
                                                <h2 className="text-3xl font-black text-slate-900">{nombre || "Sin nombre"}</h2>
                                                <span className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">✎</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Título Profesional</label>
                                    <div className="flex items-center gap-3">
                                        {isEditingRole ? (
                                            <input value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} onBlur={() => setIsEditingRole(false)} className="bg-slate-50 p-2 rounded-xl font-bold text-violet-600 outline-none border-2 border-violet-100" autoFocus />
                                        ) : (
                                            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingRole(true)}>
                                                <h2 className="text-lg font-bold text-violet-600">{roleTitle || "Sin título"}</h2>
                                                <span className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity text-xs">✎</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-slate-50">
                                {role === 'talent' ? (
                                    <>
                                        <input value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="Universidad" required className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none" />
                                        <div className="flex items-center gap-4">
                                            <input type="checkbox" checked={isStudying} onChange={() => setIsStudying(!isStudying)} className="w-5 h-5 accent-violet-600" />
                                            <span className="text-sm font-bold text-slate-600 italic">Cursando actualmente</span>
                                            {isStudying && <input value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="Semestre" className="w-full p-2 bg-violet-50 rounded-xl font-bold text-violet-700 outline-none" />}
                                        </div>
                                    </>
                                ) : (
                                    <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ubicación" required className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none" />
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                            <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-4">Descripción General</h3>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="w-full p-4 bg-slate-50 rounded-2xl outline-none resize-none font-medium text-slate-600" placeholder="Escribe tu bio..."></textarea>
                        </div>

                        {role === 'talent' && (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-8 pb-4 flex justify-between items-center">
                                    <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Habilidades</h3>
                                    <button type="button" onClick={() => setIsModalOpen(true)} className="bg-slate-900 text-white px-5 py-2 rounded-2xl text-xs font-black uppercase hover:bg-violet-600">Agregar</button>
                                </div>
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50"><tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest"><th className="px-8 py-4">Skill</th><th className="px-8 py-4">Nivel</th><th className="px-8 py-4">Exp.</th><th className="px-8 py-4"></th></tr></thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {skills.map(s => (
                                            <tr key={s.id} className="text-sm font-bold text-slate-700">
                                                <td className="px-8 py-4"><span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-lg text-xs font-black">{s.name}</span></td>
                                                <td className="px-8 py-4 text-slate-400 italic font-medium">{s.cert}</td>
                                                <td className="px-8 py-4">{s.exp}</td>
                                                <td className="px-8 py-4 text-right">
                                                    <button type="button" onClick={() => deleteSkill(s.id)} className="text-red-400 hover:text-red-600 font-black text-[10px] uppercase">Borrar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <button type="submit" className="w-full bg-violet-600 text-white font-black py-5 rounded-[2rem] shadow-xl hover:bg-violet-700 transition-all uppercase tracking-widest">
                            Guardar Perfil en PostgreSQL
                        </button>
                    </form>
                </section>
            </main>

            {/* MODAL DE SKILLS */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <form onSubmit={addSkill} className="bg-white rounded-[2.5rem] w-full max-w-md p-8 relative shadow-2xl">
                        <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase">Nueva Skill</h2>
                        <div className="space-y-4 mb-8">
                            <input required value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" placeholder="Nombre" />
                            <input required value={newSkill.exp} onChange={(e) => setNewSkill({ ...newSkill, exp: e.target.value })} className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" placeholder="Exp (Ej: 1 año)" />
                            <select value={newSkill.cert} onChange={(e) => setNewSkill({ ...newSkill, cert: e.target.value })} className="w-full p-4 bg-slate-50 rounded-2xl font-bold">
                                <option>No certificada</option><option>Verificada</option><option>Certificado IUTEPI</option>
                            </select>
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-bold text-slate-400 uppercase text-xs">Cancelar</button>
                            <button type="submit" className="flex-1 bg-violet-600 text-white py-4 rounded-2xl font-black shadow-lg uppercase text-xs">Guardar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}