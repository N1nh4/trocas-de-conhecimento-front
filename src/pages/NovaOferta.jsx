"use client";
import { useEffect, useState } from "react";
import { criarConhecimentoService } from "../services/conhecimentoService";

export default function NovaOferta() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    async function pessoaService() {
      const resp = await fetch("http://localhost:3000/pessoas/");
      const data = await resp.json();
      setPessoas(data);
    }
    pessoaService();
  }, []);

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
    const novaOferta = {
      titulo,
      descricao,
      categoria,
      nivel,
      pessoaId: Number(responsavel),
    };
    e.preventDefault();
    await criarConhecimentoService(novaOferta);
  }

  return (
    <div className="flex flex-col items-center bg-[#F9FBFA] h-screen ">
      <div className="flex flex-col items-start justify-start mt-10">
        <div className="flex flex-col mb-8">
          <h1 className="font-bold text-3xl">Nova Oferta de Conhecimento</h1>
          <p>Compartilhe o que você sabe com a comunidade.</p>
        </div>
        {/* Formulário de cadastro */}
        <div className="bg-white text-black flex flex-col  p-6 rounded-xl w-md ">
          <form
            action=""
            className="flex flex-col gap-4 "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Título *
              </label>
              <input
                type="text"
                name="titulo"
                id="titulo"
                placeholder="Ex: React do Zero"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="bg-[#F9FBFA] border border-[#DCE5E0] rounded-xl focus:outline-none focus:border-[#24B195] focus:ring-[#24B195] py-2 px-3"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Descrição *
              </label>
              <textarea
                name="descricao"
                id="descriacao"
                placeholder="Descreva o conhecimento..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="bg-[#F9FBFA] border border-[#DCE5E0] focus:outline-none focus:border-[#24B195] focus:ring-[#24B195] rounded-xl py-2 px-3"
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Categoria *
              </label>
              <select
                name="categoria"
                id="categoria"
                onChange={(e) => setCategoria(e.target.value)}
                value={categoria}
                className="bg-[#F9FBFA] border border-[#DCE5E0] focus:outline-none focus:border-[#24B195] focus:ring-[#24B195] rounded-xl py-2 px-3"
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
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Nível *
              </label>
              <select
                name="nivel"
                id="nivel"
                onChange={(e) => setNivel(e.target.value)}
                value={nivel}
                className="bg-[#F9FBFA] border border-[#DCE5E0] rounded-xl focus:outline-none focus:border-[#24B195] focus:ring-[#24B195] py-2 px-3"
              >
                <option value="">Selecione</option>
                {niveis.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Pessoa responsável *
              </label>
              <select
                name="responsavel"
                id="responsavel"
                onChange={(e) => setResponsavel(e.target.value)}
                value={responsavel}
                className="bg-[#F9FBFA] border border-[#DCE5E0] rounded-xl focus:outline-none focus:border-[#24B195] focus:ring-[#24B195] py-2 px-3"
              >
                <option value="">Selecione</option>
                {pessoas.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-rol w-full justify-between gap-2">
              <button
                className="bg-[#24B195] w-full py-2 px-4 rounded-xl text-white cursor-pointer"
                type="submit"
              >
                Salvar
              </button>
              <button className="bg-[#F9FBFA] w-full py-2 px-4 rounded-xl cursor-pointer">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
