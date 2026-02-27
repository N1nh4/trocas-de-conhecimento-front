import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ConhecimentosList from "../pages/ConhecimentosList";
import ConhecimentoDetalhe from "../pages/ConhecimentoDetalhe";
import NovaPessoa from "../pages/NovaPessoa";
import NovaOferta from "../pages/NovaOferta";
import EditarOferta from "../pages/EditarOferta";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Landing page */}
                <Route path="/" element={<Home />} />

                {/* Visualização */}
                <Route path="/conhecimentos" element={<ConhecimentosList />} />
                <Route path="/conhecimentos/:id" element={<ConhecimentoDetalhe />} />

                {/* Cadastros */}
                <Route path="/pessoas/nova" element={<NovaPessoa />} />
                <Route path="/ofertas/nova" element={<NovaOferta />} />

                {/* Edição */}
                <Route path="/ofertas/:id/editar" element={<EditarOferta />} />

            </Routes>
        </BrowserRouter>
    );
}