"use client";
import {
  ArrowLeft,
  Mail,
  Pencil,
  Phone,
  Trash,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listarConhecimentosPorID } from "../services/conhecimentoService";
import { ExcluirOferta } from "../components/ExcluirOferta";
import { useNavigate } from "react-router-dom";

export default function ConhecimentoDetalhe() {
  const [conhecimento, setConhecimento] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleContato() {
    const email = conhecimento.pessoa.email;
    window.location.href = `mailto:${email}`;
  }

  function handleNavConhecimentos() {
    navigate("/conhecimentos");
  }

  function handleNavEditarOferta() {
    navigate(`/ofertas/${id}/editar`);
  }

  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      const data = await listarConhecimentosPorID(id);
      setConhecimento(data);
    }

    fetchData();
  }, [id]);

  const nivel = {
    INICIANTE: "bg-[#D1FAE5] text-[#047857]  ",
    INTERMEDIARIO: "bg-[#FEF3C7] text-[#b45309]",
    AVANCADO: "bg-[#FFE4E6] text-[#be123c]",
  };

  if (!conhecimento) return <p>Carregando...</p>;
  return (
    <div className="flex flex-col items-center h-screen bg-[#F9FBFA] ">
      <div className="flex flex-col  w-2xl ">
        <div className="flex items-start ">
          <button
            className="hover:bg-amber-600 flex hover:text-white py-2 px-4 rounded-md cursor-pointer items-center gap-2 text-sm my-8"
            onClick={handleNavConhecimentos}
          >
            {" "}
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex flex-row gap-2">
            <div className="bg-[#F1F3F5] px-2 rounded-lg text-sm">
              {conhecimento.categoria.toLowerCase()}
            </div>
            <div
              className={`px-2 rounded-lg text-sm ${
                nivel[conhecimento.nivel] || "bg-gray-100 text-gray-700"
              }`}
            >
              {conhecimento.nivel.toLowerCase()}
            </div>
          </div>

          <div className="mt-4">
            <h1 className="font-bold text-2xl">{conhecimento.titulo}</h1>
            <p className="text-sm text-[#67777E]">{conhecimento.descricao}</p>
          </div>

          <hr className="border-none h-[1px] bg-[#e7e9e8] my-8" />

          <span>Pessoa responsável</span>

          <div className="py-2">
            <div className="flex items-center gap-2 text-sm text-[#24B195]">
              <User size={16} />{" "}
              <span className="text-[#67777E]">{conhecimento.pessoa.nome}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#24B195]">
              <Mail size={16} />
              <span className="text-[#67777E]">
                {conhecimento.pessoa.email}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#24B195]">
              <Phone size={16} />{" "}
              <span className="text-[#67777E]">
                {conhecimento.pessoa.telefone}
              </span>
            </div>
          </div>

          <hr className="border-none h-[1px] bg-[#e7e9e8] my-8" />

          <div className="flex gap-2">
            <button
              className="bg-[#24B195] w-full py-2 px-4 rounded-xl text-white cursor-pointer"
              onClick={handleContato}
            >
              Entrar em contato
            </button>
            <button
              className="bg-[#F9FBFA] w-full py-2 px-4 rounded-xl cursor-pointer flex items-center gap-2 justify-center border border-[#DCE5E0] hover:bg-amber-600 hover:text-white"
              onClick={handleNavEditarOferta}
            >
              <Pencil size={16} />
              Editar
            </button>

            <ExcluirOferta />
          </div>
        </div>
      </div>
    </div>
  );
}
