import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Columna 1: Logo y Eslogan */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg text-white font-extrabold text-xl">
                                S
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                                Skill<span className="text-violet-600">Hub</span>
                            </span>
                        </div>
                        <p className="text-slate-500 max-w-sm leading-relaxed">
                            La plataforma líder en conexión de talento universitario con el mundo laboral en Venezuela. Impulsando el futuro, un estudiante a la vez.
                        </p>
                    </div>

                    {/* Columna 2: Enlaces Rápidos */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Plataforma</h3>
                        <ul className="space-y-4 text-sm font-medium text-slate-500">
                            <li><Link to="/talentos" className="hover:text-violet-600 transition-colors">Buscar Talento</Link></li>
                            <li><Link to="/trabajos" className="hover:text-violet-600 transition-colors">Buscar Empleo</Link></li>
                            <li><Link to="/login" className="hover:text-violet-600 transition-colors">Iniciar Sesión</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3: Institución */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Institución</h3>
                        <ul className="space-y-4 text-sm font-medium text-slate-500">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-600"></span>
                                IUTEPI Valencia
                            </li>
                            <li>Feria Tecnológica 2026</li>
                            <li className="italic text-slate-400">Prototipo v1.0</li>
                        </ul>
                    </div>
                </div>

                {/* Línea Divisoria y Copyright con Botones de GitHub */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-400 font-medium">
                        © {currentYear} SkillHub. Todos los derechos reservados.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                        <span className="mr-1">Desarrollado con ❤️ por</span>

                        {/* Botón Sebastian */}
                        <a
                            href="https://github.com/SAGS2002"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1.5 bg-slate-100 text-slate-800 rounded-full font-bold hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-200 transition-all flex items-center gap-2 border border-slate-200"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            Sebastian Gallardo
                        </a>

                        <span className="text-slate-300">&</span>

                        {/* Botón Sneider */}
                        <a
                            href="https://github.com/NeidLord"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1.5 bg-slate-100 text-slate-800 rounded-full font-bold hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-200 transition-all flex items-center gap-2 border border-slate-200"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            Sneider Quintero
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}