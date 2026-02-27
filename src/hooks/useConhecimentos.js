import { useEffect, useState } from "react";
import { listConhecimentos } from "../services/conhecimentoService";

// Hook para listar conhecimentos com filtros (Rhobertta)
export function useConhecimentos(filters) {

    const [conhecimentos, setConhecimentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchConhecimentos() {
            try {
                setLoading(true);
                setError(null);

                const data = await listConhecimentos(filters);

                setConhecimentos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchConhecimentos();
    }, [filters]);

    return {
        conhecimentos,
        loading,
        error,
    };
}

// Hook para buscar um conhecimento por ID para exibir detalhes (Alana) 


