import TagService from "@/lib/services/TagService";
import { notFound } from "next/navigation";
import LayoutComCabecalho from "../../../Layouts/LayoutComCabecalho";

export default async function Layout({ children, params }) {
    const { tagSlug } = params;
    const tag = await TagService.findBySlug(tagSlug);
    if (!tag) {
        notFound();
    }

    return (
        <>
            <LayoutComCabecalho
                cabecalho={{
                    subtitulo: "Tags",
                    titulo: tag.name,
                    descricao: `Há <span>${tag.count}</span> post(s) publicados nesta tag.`,
                }}
            >
                {children}
            </LayoutComCabecalho>
        </>
    );
}