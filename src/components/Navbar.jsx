import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar({ usuario }) {
    const [isOpen, setIsOpen] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const navigate = useNavigate();

    // Cargamos la foto guardada en localStorage al iniciar
    useEffect(() => {
        const savedImage = localStorage.getItem('user_photo');
        if (savedImage) {
            setFotoPerfil(savedImage);
        }
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('access_token');
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-purple-100 w-full font-sans">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Lado Izquierdo: Logo */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md">S</div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">Skill<span className="text-violet-600">Hub</span></span>
                    </Link>

                    {/* Links de Navegación principales */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500">
                        <Link to={usuario === 'talent' ? "/dashboard-estudiante" : "/dashboard-empresa"} className="hover:text-violet-600 transition-colors">
                            Panel Control
                        </Link>
                        <Link to={usuario === 'talent' ? "/trabajos" : "/talentos"} className="hover:text-violet-600 transition-colors">
                            {usuario === 'talent' ? "Buscar Trabajos" : "Buscar Talentos"}
                        </Link>
                    </div>
                </div>

                {/* Lado Derecho: Perfil y Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black text-slate-900 leading-none">Mi Cuenta</p>
                            <p className="text-[10px] text-violet-600 font-bold uppercase tracking-wider">{usuario === 'talent' ? 'Estudiante' : 'Empresa'}</p>
                        </div>

                        {/* Círculo de la Foto */}
                        <div className="w-10 h-10 rounded-full bg-violet-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                            {fotoPerfil ? (
                                <img src={fotoPerfil} alt="Perfil" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-violet-700 font-bold text-sm">
                                    {usuario === 'talent' ? 'ST' : 'EM'}
                                </span>
                            )}
                        </div>
                    </button>

                    {/* Menú Desplegable */}
                    {isOpen && (
                        <>
                            <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)}></div>
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-4 py-3 border-b border-slate-50">
                                    <p className="text-sm font-bold text-slate-900">Sebastian Gallardo</p>
                                    <p className="text-xs text-slate-500 truncate">sebastian@iutepi.edu.ve</p>
                                </div>

                                <Link
                                    to={`/perfil?role=${usuario}`}
                                    className="block px-4 py-2.5 text-sm text-slate-700 font-medium hover:bg-violet-50 hover:text-violet-700 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Mi Perfil Profesional
                                </Link>

                                <div className="border-t border-slate-50 mt-2">
                                    <button
                                        onClick={cerrarSesion}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 font-bold hover:bg-red-50 transition-colors"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}