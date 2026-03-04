import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  // Função para a subida lenta caso o usuário clique em "Início" estando em outra página
  const scrollToTopLento = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-[#f8fafc] flex flex-col">

      {/* Menu transparente (glassmorphism) igual ao da Home */}
      <nav className="flex items-center justify-between px-10 py-4 bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <div className="bg-teal-600 p-1.5 rounded-lg text-white">
            <BookOpen size={20} />
          </div>
          <span className="text-xl tracking-tight">Banco de Trocas</span>
        </div>

        <div className="flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link
            to="/"
            className="hover:text-teal-600 transition cursor-pointer"
            onClick={scrollToTopLento}
          >
            Início
          </Link>
          <Link
            to="/pessoas/nova"
            className={`transition ${location.pathname === '/pessoas/nova' ? 'text-teal-600 font-bold' : 'hover:text-teal-600'}`}
          >
            Cadastrar-se
          </Link>
          <Link
            to="/conhecimentos"
            className={`transition ${location.pathname.includes('/conhecimentos') ? 'text-teal-600 font-bold' : 'hover:text-teal-600'}`}
          >
            Conhecimentos
          </Link>
          <Link
            to="/ofertas/nova"
            className="bg-[#ea7b0c] text-white px-5 py-2.5 rounded-xl hover:bg-[#d46d0a] transition shadow-lg shadow-orange-900/20 text-xs font-bold uppercase tracking-wider inline-block text-center"
          >
            Quero oferecer conhecimento
          </Link>
        </div>
      </nav>

      {/* Área central onde as páginas vão aparecer */}
      <main className="flex-grow w-full px-10 pt-1 pb-8">
        <div key={location.pathname} className="anime-up">
          <Outlet />
        </div>
      </main>

      {/* Rodapé igual ao da Home */}
      <footer className="py-8 px-10 border-t border-slate-200 bg-white/30 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-800 shrink-0">
            <div className="bg-teal-600/10 p-1.5 rounded-lg">
              <BookOpen size={20} className="text-teal-600" />
            </div>
            <span className="text-lg tracking-tight text-slate-900">Banco de Trocas</span>
          </div>
          <div className="text-slate-500 text-[12px] font-medium text-center md:text-right whitespace-nowrap">
            © 2026 Desenvolvido por Alana Abreu, Kaline Cerqueira, Pedro Lorenzon e Rhobertta Grasielle. Todos os direitos reservados.
          </div>
        </div>
      </footer>

    </div>
  );
}