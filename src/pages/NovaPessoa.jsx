import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarPessoa } from "../services/pessoaService";

export default function NovaPessoa() {

  //-- Estados dos campos do formulário:

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");


  //-- Estados de controle de UX:

  // "Loading" impede usuário de cliclar duas vezes e mostra feedback visual
  const [loading, setLoading] = useState(false);

  // "erro" guarda mensagens de erro para exibir na tela
  const [erro, setErro] = useState(null);

  // "sucesso" controla se o cadastro foi efetuado com êxito
  const [sucesso, setSucesso] = useState(false);

  // "errosValidacao" guarda erros de cada campo
  const [errosValidacao, setErrosValidacao] = useState({});

  // useNavigate permite redirecionamento para outra página
  const navigate = useNavigate();


  //-- Validação do formulário:

  function validarFormulario() {
    const erros = {};

    if (!nome.trim()) {
      erros.nome = "Nome completo é um campo obrigatório."
    }

    if (!email.trim()) {
      erros.email = "Email é obrigatório."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      erros.email = "Informe um fomraato válido de email."
    }

    if (!telefone.trim()) {
      erros.telefone = "Telefone é um campo obrigatório."
    }

    setErrosValidacao(erros);
    return Object.keys(erros).length === 0; // true = sem erros.
  }


  // -- Envio do fromulário:

  async function handleSubmit(e) {
    e.preventDefault();

    setErro(null);

    if (!validarFormulario()) return;

    try {
      setLoading(true); // ativa o loading

      // Monta objeto pessoa
      const novaPessoa = {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        descricao: descricao.trim() || null,
      };

      await criarPessoa(novaPessoa);

      setSucesso(true);

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  // -- Cancelar:

  function handleCancelar() {
    navigate("/");
  }


  // -- Criação da Tela:

  return (
    <div className="flex flex-col items-center bg-[#F9FBFA] min-h-screen py-12">
      {/* Cabeçalho da página */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="font-bold text-3xl text-gray-800">Cadastrar-se</h1>
        <p className="text-gray-500 mt-1">
          Preencha seus dados para participar da comunidade.
        </p>
      </div>

      {/* Card do formulário */}
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-lg">

        {/* Mensagem de sucesso — aparece após o cadastro ser concluído */}
        {sucesso && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-xl text-sm">
            ✅ Pessoa cadastrada com sucesso! Redirecionando...
          </div>
        )}

        {/* Mensagem de erro geral — aparece se o backend retornar erro */}
        {erro && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
            ❌ {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Campo: Nome completo */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700 text-sm">
              Nome completo *
            </label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`bg-[#F9FBFA] border rounded-xl py-2 px-3 focus:outline-none focus:border-[#24B195] focus:ring-1 focus:ring-[#24B195] ${errosValidacao.nome ? "border-red-400" : "border-[#DCE5E0]"
                }`}
            />
            {/* Mensagem de erro específica do campo */}
            {errosValidacao.nome && (
              <span className="text-red-500 text-xs">{errosValidacao.nome}</span>
            )}
          </div>

          {/* Campo: Email */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700 text-sm">
              Email *
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-[#F9FBFA] border rounded-xl py-2 px-3 focus:outline-none focus:border-[#24B195] focus:ring-1 focus:ring-[#24B195] ${errosValidacao.email ? "border-red-400" : "border-[#DCE5E0]"
                }`}
            />
            {errosValidacao.email && (
              <span className="text-red-500 text-xs">{errosValidacao.email}</span>
            )}
          </div>

          {/* Campo: Telefone */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700 text-sm">
              Telefone *
            </label>
            <input
              type="tel"
              placeholder="(11) 99999-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className={`bg-[#F9FBFA] border rounded-xl py-2 px-3 focus:outline-none focus:border-[#24B195] focus:ring-1 focus:ring-[#24B195] ${errosValidacao.telefone ? "border-red-400" : "border-[#DCE5E0]"
                }`}
            />
            {errosValidacao.telefone && (
              <span className="text-red-500 text-xs">{errosValidacao.telefone}</span>
            )}
          </div>

          {/* Campo: Descrição (opcional) */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700 text-sm">
              Descrição
            </label>
            <textarea
              placeholder="Conte um pouco sobre você..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              className="bg-[#F9FBFA] border border-[#DCE5E0] rounded-xl py-2 px-3 focus:outline-none focus:border-[#24B195] focus:ring-1 focus:ring-[#24B195] resize-y"
            />
          </div>

          {/* Botões: Cadastrar e Cancelar */}
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading} // Desabilita o botão enquanto carrega
              className="bg-[#24B195] w-full py-2 px-4 rounded-xl text-white font-semibold cursor-pointer hover:bg-[#1e9c82] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {/* Alterna o texto do botão dependendo do estado de loading */}
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
            <button
              type="button"
              onClick={handleCancelar}
              disabled={loading}
              className="bg-[#F9FBFA] w-full py-2 px-4 rounded-xl border border-[#DCE5E0] font-semibold cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-60"
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );

}