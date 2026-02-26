import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Perfil() {

    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'talent';

    // Referencia al input oculto
    const fileInputRef = useRef(null);

    // Estados
    const [roleTitle, setRoleTitle] = useState('Front-end Developer');
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [isStudying, setIsStudying] = useState(true);
    const [percentage, setPercentage] = useState(40);

    // Estado para la imagen de perfil (Inicia con el avatar por defecto)
    const [profileImage, setProfileImage] = useState(
        "https://ui-avatars.com/api/?name=Sebastian+Gallardo&background=7c3aed&color=fff"
    );

    // Función para activar el selector de archivos
    const handleEditPhotoClick = () => {
        fileInputRef.current.click();
    };

    // Función para procesar la imagen seleccionada
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Creamos una URL temporal para la previsualización
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            // Si el porcentaje no es 100, le sumamos por subir la foto
            if (percentage < 100) setPercentage(prev => prev + 20);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar usuario={role} />

            <main className="max-w-7xl mx-auto w-full p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* COLUMNA IZQUIERDA: Progreso y Foto */}
                <aside className="lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Completa tu perfil</h4>
                        <div className="flex items-end justify-between mb-2">
                            <span className="text-3xl font-black text-violet-600">{percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                            <div className="bg-violet-600 h-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                <div className={`w-4 h-4 rounded-full border-2 ${percentage > 40 ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200'}`}></div> Foto de perfil +20%
                            </li>
                            <li className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">✓</div> Habilidades +20%
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
                        <div className="relative inline-block">
                            {/* IMAGEN DE PERFIL DINÁMICA */}
                            <img
                                src={profileImage}
                                className="w-32 h-32 rounded-full border-4 border-slate-50 shadow-inner mx-auto object-cover"
                                alt="Profile"
                            />

                            {/* INPUT DE ARCHIVO OCULTO */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {/* BOTÓN QUE ACTIVA LA CARGA */}
                            <button
                                onClick={handleEditPhotoClick}
                                className="absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-full text-xs font-bold shadow-lg hover:bg-violet-600 transition-colors"
                                title="Cambiar foto"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                        <h3 className="mt-4 font-bold text-slate-900">Sebastian Gallardo</h3>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 italic">IUTEPI - Venezuela</p>
                    </div>
                </aside>

                {/* COLUMNA DERECHA: Información Principal */}
                <section className="lg:col-span-9 space-y-6">

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-grow mr-4">
                                <h1 className="text-3xl font-black text-slate-900 mb-1">Sebastian Gallardo</h1>

                                {/* LÓGICA DE EDICIÓN DE ROL */}
                                <div className="flex items-center gap-3">
                                    {isEditingRole ? (
                                        <div className="flex items-center gap-2 w-full max-w-md">
                                            <input
                                                type="text"
                                                value={roleTitle}
                                                onChange={(e) => setRoleTitle(e.target.value)}
                                                className="bg-slate-50 border-2 border-violet-200 p-2 rounded-xl text-lg font-bold text-violet-700 outline-none w-full"
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => setIsEditingRole(false)}
                                                className="bg-emerald-500 text-white p-2 rounded-xl font-bold text-xs"
                                            >
                                                Listo
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="text-lg font-bold text-violet-600">{roleTitle}</h2>
                                            <button
                                                onClick={() => setIsEditingRole(true)}
                                                className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors"
                                            >
                                                [ Editar Rol ]
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Valor hora</p>
                                <p className="text-2xl font-black text-slate-900 mt-1">$15 - 25</p>
                            </div>
                        </div>

                        {/* Configuración Académica */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                            {role === 'talent' ? (
                                <>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Universidad Nacional</label>
                                        <select className="w-full p-3 bg-slate-50 rounded-xl border-none text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-violet-500">
                                            <option>IUTEPI</option>
                                            <option>Universidad de Carabobo</option>
                                            <option>UCAB</option>
                                            <option>ULA</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Estatus Académico</label>
                                        <div className="flex items-center gap-4 mt-2">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={isStudying} onChange={() => setIsStudying(!isStudying)} className="w-4 h-4 accent-violet-600 rounded" />
                                                <span className="text-sm font-bold text-slate-600">Sigo estudiando</span>
                                            </label>
                                        </div>
                                        {isStudying && (
                                            <input type="text" placeholder="¿Qué semestre cursas?" className="mt-3 w-full p-3 bg-violet-50 rounded-xl border-none text-sm font-bold text-violet-700 placeholder:text-violet-300 outline-none animate-in fade-in duration-300" />
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Ubicación de la Empresa</label>
                                    <input type="text" placeholder="Ej: Valencia, Carabobo" className="w-full p-3 bg-slate-50 rounded-xl border-none text-sm font-bold text-slate-700 outline-none" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sobre Mí */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Sobre mí</h3>
                            <button className="text-xs font-bold text-violet-600 hover:bg-violet-50 px-3 py-1 rounded-lg transition-colors">Guardar descripción</button>
                        </div>
                        <textarea
                            rows="5"
                            className="w-full p-4 bg-slate-50 rounded-2xl border-none text-slate-600 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-violet-100 resize-none"
                            placeholder="Sintentiza lo que mejor te define como profesional..."
                        ></textarea>
                    </div>

                    {/* Tabla de Habilidades */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-8 pb-4 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Habilidades técnicas</h3>
                            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-violet-600 transition-all">Agregar</button>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-8 py-3">Habilidad</th>
                                    <th className="px-8 py-3">Certificación</th>
                                    <th className="px-8 py-3 text-center">Años</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="text-sm font-medium text-slate-700">
                                    <td className="px-8 py-4"><span className="bg-violet-100 text-violet-600 px-3 py-1 rounded-lg text-[11px] font-bold">JavaScript</span></td>
                                    <td className="px-8 py-4 text-slate-400 italic">No certificada</td>
                                    <td className="px-8 py-4 text-center font-bold">1 año</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}