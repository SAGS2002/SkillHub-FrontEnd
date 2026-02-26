import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function DashboardCliente() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar usuario="client" />
            <main className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Panel de Reclutamiento</h1>
                    <button className="bg-violet-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-violet-200">Publicar Nuevo Proyecto</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4">Proyectos con Postulaciones Nuevas</h3>
                            <div className="flex items-center justify-between p-4 bg-violet-50 rounded-xl border border-violet-100">
                                <div>
                                    <p className="font-bold text-violet-900 font-sans">App Móvil Estudiantil</p>
                                    <p className="text-xs text-violet-600 font-bold uppercase tracking-wider">14 nuevas aplicaciones</p>
                                </div>
                                <Link to="/talentos" className="text-sm font-bold text-violet-700 underline">Revisar Talentos</Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
                        <h3 className="font-bold mb-4">Tips de Contratación</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Recuerda que los estudiantes de los últimos semestres del IUTEPI tienen prioridad en pasantías de sistemas.</p>
                        <div className="mt-6 p-4 bg-slate-800 rounded-xl">
                            <p className="text-xs font-bold text-slate-500 uppercase">Talento Recomendado</p>
                            <p className="font-bold mt-1 text-emerald-400">Sebastian Garcia</p>
                            <p className="text-xs">IUTEPI • Frontend</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}