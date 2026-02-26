import Navbar from '../components/Navbar';
import { talentos, universidades } from '../data/mockData';

export default function BuscadorTalento() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar usuario="client" />
            <div className="max-w-7xl mx-auto p-6">
                {/* Filtros */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-4 mb-8">
                    <input type="text" placeholder="Buscar por rol o skill..." className="flex-grow p-3 bg-slate-50 rounded-xl border-none text-sm focus:ring-2 focus:ring-violet-500" />
                    <select className="p-3 bg-slate-50 rounded-xl border-none text-sm font-bold text-slate-600">
                        <option>Todas las Universidades</option>
                        {universidades.map(u => <option key={u}>{u}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {talentos.map(t => (
                        <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-violet-200 transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <img src={t.avatar} className="w-14 h-14 rounded-full border-2 border-white ring-2 ring-violet-50" />
                                <div>
                                    <h3 className="font-bold text-slate-900 leading-none">{t.nombre}</h3>
                                    <p className="text-violet-600 text-xs font-bold mt-1 uppercase tracking-tighter">{t.rol}</p>
                                </div>
                            </div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.universidad} • {t.semestre}</p>
                            <p className="text-sm text-slate-600 line-clamp-2 mb-4">{t.descripcion}</p>
                            <div className="flex flex-wrap gap-1 mb-6">
                                {t.skills.map(s => <span key={s} className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded font-bold uppercase">{s}</span>)}
                            </div>
                            <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-violet-600 transition-all">Ver Perfil Técnico</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}