import Navbar from '../components/Navbar';
import { misPostulaciones } from '../data/mockData';

export default function DashboardTalento() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar usuario="talent" />
            <main className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-slate-800 mb-8">¡Hola, Sebastian! 👋</h1>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-slate-500 text-sm font-bold uppercase">Postulaciones Activas</p>
                        <p className="text-4xl font-black text-violet-600">12</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-slate-500 text-sm font-bold uppercase">Invitaciones</p>
                        <p className="text-4xl font-black text-emerald-500">3</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-slate-500 text-sm font-bold uppercase">Perfil Visto</p>
                        <p className="text-4xl font-black text-blue-500">45</p>
                    </div>
                </div>

                {/* Postulaciones */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50"><h2 className="font-bold text-slate-800">Mis Postulaciones Recientes</h2></div>
                    <div className="divide-y divide-slate-50">
                        {misPostulaciones.map(p => (
                            <div key={p.id} className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                <div>
                                    <p className="font-bold text-slate-800">{p.proyecto}</p>
                                    <p className="text-sm text-slate-500">{p.empresa} • {p.fecha}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.estado === 'Seleccionado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {p.estado}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}