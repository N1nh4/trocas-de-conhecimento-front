import { useState, useEffect } from "react";
import { listarPessoas } from "../services/pessoaService";

// Hook para buscar e gerenciar a lista de pessoas
export function usePessoas() {
  
    const [pessoas, setPessoas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function buscarPessoas() {
            try {
                
                setLoading(true);
                const data = await listarPessoas();
                setPessoas(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        buscarPessoas();
    }, []); 

  return { pessoas, loading, error };
}