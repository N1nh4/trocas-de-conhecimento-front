import { Link } from 'react-router-dom';
import {
  User,
  BookOpen,
  RefreshCw,
  Globe,
  Users,
  Shield,
  Heart,
  Database,
  Zap
} from 'lucide-react';

export default function Home() {

  {/* Função para subida lenta (slow scroll) solicitada pela Pessoa 2 */ }
  const scrollToTopLento = (e) => {
    e.preventDefault();
    const duracao = 1500; // Tempo em milissegundos para a subida
    const inicioPosicao = window.pageYOffset;
    const tempoInicial = performance.now();

    function animacao(tempoAtual) {
      const tempoDecorrido = tempoAtual - tempoInicial;
      const progresso = Math.min(tempoDecorrido / duracao, 1);

      {/* Função de suavização (easing) */ }
      const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      window.scrollTo(0, inicioPosicao * (1 - easeInOutQuad(progresso)));

      if (tempoDecorrido < duracao) {
        requestAnimationFrame(animacao);
      }
    }
    requestAnimationFrame(animacao);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-[#f8fafc]">

      {/* menu transparente (glassmorphism) */}
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
            className="text-teal-600 font-bold cursor-pointer"
            onClick={scrollToTopLento}
          >
            Início
          </Link>
          <Link to="/pessoas/nova" className="hover:text-teal-600 transition">Cadastrar-se</Link>
          <Link to="/conhecimentos" className="hover:text-teal-600 transition">Conhecimentos</Link>
          {/* Botão do menu ajustado para o laranja #ea7b0c consistente com o CTA */}
          <Link
            to="/ofertas/nova"
            className="bg-[#ea7b0c] text-white px-5 py-2.5 rounded-xl hover:bg-[#d46d0a] transition shadow-lg shadow-orange-900/20 text-xs font-bold uppercase tracking-wider inline-block text-center"
          >
            Quero oferecer conhecimento
          </Link>
        </div>
      </nav>

      {/* inicio (gradiente) */}
      <section className="relative bg-gradient-to-tr from-[#0d9488] via-[#1a9a9b] to-[#2563eb] py-32 px-6 text-center text-white overflow-hidden">
        {/* circulos decorativos transparentes no fundo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -mr-32 -mb-32"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <h1 className="text-5xl md:text-5xl font-black mb-8 leading-[1.1] tracking-tight">
            Compartilhe o que você sabe, <br />
            <span className="text-teal-200">aprenda o que precisa.</span>
          </h1>
          <p className="text-lg md:text-xl text-teal-50/90 mb-12 max-w-2xl leading-relaxed font-medium">
            Conecte-se com pessoas da comunidade para trocar conhecimentos de forma colaborativa e gratuita através da nossa plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/conhecimentos" className="bg-white text-teal-700 px-10 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all hover:-translate-y-1 shadow-xl hover:bg-[#ea7b0c] hover:text-white">
              Explorar conhecimentos <span>→</span>
            </Link>
            <Link
              to="/ofertas/nova"
              className="bg-white/10 border border-white/30 text-white px-10 py-4 rounded-2xl font-bold backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center"
            >
              Oferecer conhecimento
            </Link>
          </div>
        </div>
      </section>

      {/* como funciona (translucido) --- */}
      <section className="py-28 bg-white px-6 relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-black mb-4 text-slate-900 tracking-tight">Como funciona?</h2>
          <p className="text-slate-400 mb-20 max-w-lg mx-auto">Três passos simples para integrar sua troca de conhecimento ao nosso site.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <StepCard
              icon={<User size={24} />}
              title="Cadastre-se"
              desc="Crie seu perfil rapidamente com suas informações de contato."
            />
            <StepCard
              icon={<BookOpen size={24} />}
              title="Ofereça ou busque"
              desc="Publique o que sabe ensinar ou explore o que outros oferecem."
            />
            <StepCard
              icon={<RefreshCw size={24} />}
              title="Conecte-se"
              desc="Entre em contato diretamente e combinem a troca de conhecimento."
            />
          </div>
        </div>
      </section>

      {/* porque participar? (gradiente) */}
      <section className="py-24 relative bg-gradient-to-tr from-[#0d9488] via-[#1a9a9b] to-[#2563eb] px-6 w-full shadow-inner">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-black mb-16 text-white text-center tracking-tight">
            Por que participar?
          </h2>

          {/* grid para 3 colunas em telas grandes e 1 em celulares */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard
              icon={<Globe className="text-white" size={20} />}
              title="100% Gratuito"
              desc="Acesso livre garantido pela nossa estrutura."
            />
            <BenefitCard
              icon={<Users className="text-white" size={20} />}
              title="Comunidade Ativa"
              desc="Troque experiências reais com outros membros."
            />
            <BenefitCard
              icon={<Shield className="text-white" size={20} />}
              title="Seguro e Simples"
              desc="Integração robusta para seus dados."
            />
          </div>
        </div>
      </section>

      {/* cta (call to action) */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-tr from-[#0d9488] via-[#1a9a9b] to-[#2563eb] rounded-[3rem] p-16 text-center text-white shadow-2xl relative overflow-hidden">

          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6">Pronto para compartilhar?</h2>
            {/* ajustado para text-teal-50 para melhor contraste */}
            <p className="text-teal-50 mb-10 leading-relaxed max-w-md mx-auto opacity-90">
              Cadastre-se e comece a trocar conhecimentos com a comunidade agora mesmo.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link
                to="/pessoas/nova"
                className="bg-white text-[#1a9a9b] px-10 py-4 rounded-2xl font-bold hover:bg-[#ea7b0c] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                Criar meu perfil
              </Link>
              <Link
                to="/conhecimentos"
                className="bg-white/10 text-white px-10 py-4 rounded-2xl font-bold backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
              >
                Ver conhecimentos
              </Link>
            </div>
          </div>

          {/* luz decorativa*/}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>
        </div>
      </section>

      {/* rodapé --- */}
      <footer className="py-8 px-10 border-t border-white/20 bg-white/30 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          {/* lado esquerdo do rodapé */}
          <div className="flex items-center gap-2 font-bold text-slate-800 shrink-0">
            <div className="bg-teal-600/10 p-1.5 rounded-lg">
              <BookOpen size={20} className="text-teal-600" />
            </div>
            <span className="text-lg tracking-tight text-slate-900">Banco de Trocas</span>
          </div>

          {/* lado direito do rodapé */}
          <div className="text-slate-500 text-[12px] font-medium text-center md:text-right whitespace-nowrap">
            © 2026 Desenvolvido por Alana Abreu, Kaline Cerqueira, Pedro Lorenzon e Rhobertta Grasielle. Todos os direitos reservados.
          </div>

        </div>
      </footer>
    </div>
  );
}

// componentes auxiliares (efeito transparente)
function StepCard({ icon, title, desc }) {
  return (
    <div className="group bg-white p-10 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-default">
      <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mx-auto mb-6 transition-colors duration-300 group-hover:bg-teal-600">
        <div className="text-teal-600 transition-colors duration-300 group-hover:text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold mb-3 text-slate-800 transition-colors duration-300 group-hover:text-teal-600">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

// função pra cards retangulares
function BenefitCard({ icon, title, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 flex flex-row items-start gap-4 hover:bg-white/15 transition-all duration-300 shadow-lg">

      {/* icon fixo na esquerda com shrink-0 para não esmagar */}
      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0 shadow-inner">
        {icon}
      </div>

      {/* conteúdo da esquerda do rodapé */}
      <div className="flex flex-col text-left">
        <h3 className="font-bold text-white text-base mb-1 tracking-tight">
          {title}
        </h3>
        <p className="text-teal-50 text-[11px] leading-relaxed opacity-80">
          {desc}
        </p>
      </div>
    </div>
  );
}