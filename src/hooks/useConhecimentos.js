import { useEffect, useState } from "react";
import { listConhecimentos } from "../services/conhecimentoService";

// Hook para listar conhecimentos com filtros (Rhobertta)
export function useConhecimentos(filters) {

    const [conhecimentos, setConhecimentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Serializa o objeto para string e evitar loop infinito no useEffect
    const filtrosSerializados = JSON.stringify(filters);

    useEffect(() => {
        async function fetchConhecimentos() {
            try {
                setLoading(true);
                setError(null);

                // Deserializa de volta para passar para o serviço
                const data = await listConhecimentos(JSON.parse(filtrosSerializados));

                setConhecimentos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchConhecimentos();
    }, [filtrosSerializados]);

    return {
        conhecimentos,
        loading,
        error,
    };
}

// Hook para buscar um conhecimento por ID para exibir detalhes (Alana) 


