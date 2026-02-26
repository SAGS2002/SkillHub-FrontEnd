import { Link } from 'react-router-dom';

export default function Navbar({ usuario }) {
    return (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-purple-100 w-full">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-700 rounded-lg flex items-center justify-center text-white font-bold">S</div>
                        <span className="text-xl font-bold text-slate-900">Skill<span className="text-violet-600">Hub</span></span>
                    </Link>
                </div>
                <div className="flex items-center gap-6 text-sm font-semibold text-slate-600">
                    <Link to={usuario === 'talent' ? "/trabajos" : "/talentos"} className="hover:text-violet-600">Buscador</Link>
                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center border border-violet-200">
                        {usuario === 'talent' ? 'ST' : 'EM'}
                    </div>
                </div>
            </div>
        </nav>
    );
}