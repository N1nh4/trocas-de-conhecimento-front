"use client";
import { useEffect, useState } from "react";
import {
  atualizarConhecimentoService,
  listarConhecimentosPorID,
} from "../services/conhecimentoService";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarOferta() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [pessoas, setPessoas] = useState([]);

  const [errosForm, setErrosForm] = useState({});

  // "erro" guarda mensagens de erro para exibir na tela
  const [erro, setErro] = useState(null);

  // "sucesso" controla se o cadastro foi efetuado com êxito
  const [sucesso, setSucesso] = useState(false);

  //-- Validação do formulário:

  function validarFormulario() {
    const erros = {};

    if (!titulo.trim()) {
      erros.titulo = "Título é um campo obrigatório.";
    }

    if (!descricao.trim()) {
      erros.descricao = "Descrição é um campo obrigatório.";
    }

    if (!categoria.trim()) {
      erros.categoria = "Categoria é um campo obrigatório.";
    }

    if (!nivel.trim()) {
      erros.nivel = "Nível é um campo obrigatório.";
    }

    if (!responsavel.trim()) {
      erros.responsavel = "Pessoa responsável é um campo obrigatório.";
    }

    setErrosForm(erros);
    return Object.keys(erros).length === 0;
  }

  function handleNav() {
    navigate(`/conhecimentos/${id}`);
  }

  {
    /* Buscar pessoas pro select de responsaveis*/
  }
  useEffect(() => {
    async function pessoaService() {
      const resp = await fetch("http://localhost:3000/pessoas/");
      const data = await resp.json();
      setPessoas(data);
    }
    pessoaService();
  }, []);

  {
    /* Buscar conhecimento por id e preencher os values*/
  }
  useEffect(() => {
    if (!id) return;

    async function buscar() {
      const resp = await listarConhecimentosPorID(id);

      setTitulo(resp.titulo ?? "");
      setDescricao(resp.descricao ?? "");
      setCategoria(resp.categoria ?? "");
      setNivel(resp.nivel ?? "");
      setResponsavel(resp.pessoaId ? String(resp.pessoaId) : "");
    }
    buscar();
  }, [id]);

  const categorias = [
    "TECNOLOGIA",
    "DESIGN",
    "IDIOMAS",
    "MUSICA",
    "CULINARIA",
    "ARTES",
    "MARKETING",
    "FINANCAS",
    "SAUDE",
    "EDUCACAO",
    "ESPORTES",
    "OUTROS",
  ];

  const niveis = ["INICIANTE", "INTERMEDIARIO", "AVANCADO"];

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);

    if (!validarFormulario()) return;
    const payload = {
      titulo,
      descricao,
      categoria,
      nivel,
      pessoaId: Number(responsavel),
    };
    try {
      await atualizarConhecimentoService(id, payload);
      setSucesso(true);
      setTimeout(() => navigate(`/conhecimentos/${id}`), 2000);
    } catch (error) {
      setErro(error.message || "Erro ao editar oferta.");
    }
  }

  return (
    <div className="flex flex-col items-center bg-[#F9FBFA] h-screen ">
      <div className="flex flex-col items-start justify-start mt-10">
        <div className="flex flex-col mb-8">
          <h1 className="font-bold text-3xl">Editar Oferta</h1>
          <p>Atualize as informações do conhecimento.</p>
        </div>
        <div className="bg-white text-black flex flex-col shadow-sm p-6 rounded-xl w-md ">
          {/* Mensagem de sucesso */}
          {sucesso && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-xl text-sm">
              ✅ Nova oferta editada com sucesso! Redirecionando...
            </div>
          )}

          {/* Mensagem de erro  */}
          {erro && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
              ❌ {erro}
            </div>
          )}
          {/* Formulário de cadastro */}
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Título *</label>
              <input
                type="text"
                name="titulo"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className={`bg-[#F9FBFA] border border-[#DCE5E0] rounded-xl focus:outline-none focus:border-[#24B195] focus:ring-[#24B195] py-2 px-3 ${errosForm.titulo ? "border-red-400" : "border-[#DCE5E0]"}`}
              />
              {errosForm.titulo && (
                <span className="text-red-500 text-xs">{errosForm.titulo}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Descrição *</label>
              <textarea
                name="descricao"
                id="descriacao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className={`bg-[#F9FBFA] border border-[#DCE5E0] focus:outline-none focus:border-[#24B195] focus:ring-[#24B195] rounded-xl py-2 px-3 ${errosForm.descricao ? "border-red-400" : "border-[#DCE5E0]"}`}
              ></textarea>
              {errosForm.descricao && (
                <span className="text-red-500 text-xs">
                  {errosForm.descricao}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Categoria *</label>
              <select
                name="categoria"
                id="categoria"
                onChange={(e) => setCategoria(e.target.value)}
                value={categoria}
                className={`bg-[#F9FBFA] border border-[#DCE5E0] focus:outline-none focus:border-[#24B195] focus:ring-[#24B195] rounded-xl py-2 px-3 ${errosForm.categoria ? "border-red-400" : "border-[#DCE5E0]"} `}
              >
                <option value="" className="font-normal">
                  Selecione
                </option>
                {categorias.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errosForm.categoria && (
                <span className="text-red-500 text-xs">
                  {errosForm.categoria}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Nível *</label>
              <select
                name="nivel"
                id="nivel"
                onChange={(e) => setNivel(e.target.value)}
                value={nivel}
                className={`bg-[#F9FBFA] border border-[#DCE5E0] focus:outline-none focus:border-[#24B195] focus:ring-[#24B195] rounded-xl py-2 px-3 ${errosForm.categoria ? "border-red-400" : "border-[#DCE5E0]"} `}
              >
                <option value="">Selecione</option>
                {niveis.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              {errosForm.nivel && (
                <span className="text-red-500 text-xs">{errosForm.nivel}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">
                Pessoa responsável *
              </label>
              <select
                name="responsavel"
                id="responsavel"
                onChange={(e) => setResponsavel(e.target.value)}
                value={responsavel}
                className={`bg-[#F9FBFA] border border-[#DCE5E0] focus:outline-none focus:border-[#24B195] focus:ring-[#24B195] rounded-xl py-2 px-3 ${errosForm.categoria ? "border-red-400" : "border-[#DCE5E0]"} `}
              >
                <option value="">Selecione</option>
                {pessoas.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
              {errosForm.responsavel && (
                <span className="text-red-500 text-xs">
                  {errosForm.responsavel}
                </span>
              )}
            </div>
            <div className="flex flex-rol w-full justify-between gap-2">
              <button
                className="bg-[#24B195] w-full py-2 px-4 rounded-xl text-white cursor-pointer"
                type="submit"
              >
                Atualizar
              </button>
              <button
                className="bg-[#F9FBFA] w-full py-2 px-4 rounded-xl cursor-pointer flex items-center gap-2 justify-center border border-[#DCE5E0] hover:bg-amber-600 hover:text-white"
                onClick={handleNav}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
