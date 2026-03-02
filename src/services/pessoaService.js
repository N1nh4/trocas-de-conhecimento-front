import api from "./api";

// Função para criar uma nova pessoa (seu fluxo: NovaPessoa)
export async function criarPessoa(data) {
  try {
    const response = await api.post("/pessoas", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // O servidor respondeu com um erro (ex: email já cadastrado)
      throw new Error(
        error.response.data?.message || "Erro ao cadastrar pessoa"
      );
    } else {
      // Sem conexão com o servidor
      throw new Error("Erro de conexão com o servidor");
    }
  }
}

// Função para listar todas as pessoas cadastradas (seu fluxo: pessoaService get)
export async function listarPessoas() {
  try {
    const response = await api.get("/pessoas");
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || "Erro ao listar pessoas"
      );
    } else {
      throw new Error("Erro de conexão com o servidor");
    }
  }
}