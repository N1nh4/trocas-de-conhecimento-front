import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
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

                {/* Landing page: Fica de fora do Layout pois tem nav e footer próprios */}
                <Route path="/" element={<Home />} />

                {/* Grupo de rotas com o Layout padrão (Header e Footer) */}
                <Route element={<Layout />}>

                    {/* Visualização */}
                    <Route path="/conhecimentos" element={<ConhecimentosList />} />
                    <Route path="/conhecimentos/:id" element={<ConhecimentoDetalhe />} />

                    {/* Cadastros */}
                    <Route path="/pessoas/nova" element={<NovaPessoa />} />
                    <Route path="/ofertas/nova" element={<NovaOferta />} />

                    {/* Edição */}
                    <Route path="/ofertas/:id/editar" element={<EditarOferta />} />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}