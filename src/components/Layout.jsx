import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b p-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="font-bold text-indigo-600 text-xl">Troca de Conhecimento</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-slate-600 hover:text-indigo-600">Home</Link>
            <Link to="/cadastro" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Cadastrar</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full p-6">
        <Outlet /> {/* as outras páginas serão exibidas AQUI */}
      </main>

      <footer className="p-6 bg-white border-t text-center text-slate-400 text-sm">
        © 2026 - Projeto Avanti
      </footer>
    </div>
  );
}