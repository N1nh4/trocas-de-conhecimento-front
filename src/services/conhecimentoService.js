import api from "./api";

// Função para listar conhecimentos com filtros (Rhobertta)
export async function listConhecimentos(filters = {}) {
    try {
        const response = await api.get("/conhecimentos", {
            params: filters,
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // erro no backend
            throw new Error(
                error.response.data?.message || "Erro ao listar conhecimentos",
            );
        } else {
            throw new Error("Erro de conexão com o servidor");
        }
    }
}

// Função para criar um novo conhecimento (Alana)

async function criarConhecimentoService(data) {
    try {
        const response = await fetch("http://localhost:3000/conhecimentos/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error("Erro ao criar Conhecimento");
        }
        return response.json();
    } catch (error) {
        throw new Error("Erro ao criar Conhecimento");
    }
}

// Função para buscar um conhecimento por ID para exibir detalhes (Alana)

async function listarConhecimentosPorID(id) {
  try {
    const response = await fetch(`http://localhost:3000/conhecimentos/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      console.error("Erro ao buscar conhecimento pelo id");
    }
    return response.json();
  } catch (error) {
    throw new Error("Erro ao buscar conhecimento pelo id");
  }
}

// Função para atualizar um conhecimento existente (Alana)

async function atualizarConhecimentoService(id, data) {
  try {
    const response = await fetch(`http://localhost:3000/conhecimentos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Erro ao editar conhecimento");
    }

    return response.json();
  } catch (error) {
    throw new Error("Erro ao editar conhecimento");
  }
}

// Função para excluir um conhecimento (Alana)

async function excluirConhecimentoService(id) {
  try {
    const response = await fetch(`http://localhost:3000/conhecimentos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Erro ao excluir conhecimento");
    }
    return response;
  } catch (error) {
    throw new Error("Erro ao excluir conhecimento");
  }
}

export {
  criarConhecimentoService,
  listarConhecimentosPorID,
  excluirConhecimentoService,
  atualizarConhecimentoService,
};
