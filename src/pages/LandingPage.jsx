import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        // Cambiamos a flex-col, pero le quitamos el centrado a este contenedor padre
        <div className="min-h-screen bg-slate-50 flex flex-col">

            {/* Navbar con efecto Glassmorphism */}
            <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-purple-100 w-full">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 text-white font-extrabold text-xl">
                            S
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                            Skill<span className="text-violet-600">Hub</span>
                        </span>
                    </div>

                    {/* Opciones centrales */}
                    <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-500">
                        <Link
                            to="/login?role=client"
                            className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-5 py-2 rounded-full font-bold text-sm transition-colors"
                        >
                            Busco empleado
                        </Link>
                        <Link
                            to="/login?role=talent"
                            className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-5 py-2 rounded-full font-bold text-sm transition-colors"
                        >
                            Busco empleo
                        </Link>
                    </div>

                </div>
            </nav>

            {/* Contenedor principal que ocupa el espacio restante y centra su contenido */}
            <main className="flex-grow flex flex-col items-center justify-center p-6">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mb-12">
                    <div className="inline-block bg-violet-100 text-violet-700 font-bold px-4 py-1.5 rounded-full text-sm mb-6 border border-violet-200">
                        🚀 La red de talento universitario de Venezuela
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Impulsa tu empresa con el <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">
                            talento del futuro
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        La primera plataforma que conecta a estudiantes universitarios y recién graduados con empresas que buscan ideas frescas, innovación y ganas de crecer.
                    </p>
                </div>

                {/* Tarjetas de Decisión */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">

                    {/* Tarjeta: Buscar Empleado (Cliente) */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-violet-200 transition-all flex flex-col items-center text-center group">
                        <div className="bg-violet-50 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Quiero contratar</h2>
                        <p className="text-slate-600 mb-8 flex-grow">
                            Encuentra desarrolladores, diseñadores y especialistas para hacer realidad tu proyecto.
                        </p>
                        <Link
                            to="/login?role=client"
                            className="w-full bg-violet-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors shadow-md shadow-violet-200"
                        >
                            Buscar talento
                        </Link>
                    </div>

                    {/* Tarjeta: Buscar Trabajo (Talento) */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all flex flex-col items-center text-center group">
                        <div className="bg-emerald-50 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Quiero trabajar</h2>
                        <p className="text-slate-600 mb-8 flex-grow">
                            Crea tu perfil, destaca tus habilidades (skills) y encuentra proyectos increíbles.
                        </p>
                        <Link
                            to="/login?role=talent"
                            className="w-full bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200"
                        >
                            Ofrecer mis servicios
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}   