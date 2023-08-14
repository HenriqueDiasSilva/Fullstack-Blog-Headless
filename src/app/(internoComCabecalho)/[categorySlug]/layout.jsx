import CategoryService from "@/lib/services/CategoryService";
import { notFound } from "next/navigation";
import LayoutComCabecalho from "../../Layouts/LayoutComCabecalho";

export default async function Layout({ children, params }) {
    const { categorySlug } = params;
    const category = await CategoryService.findBySlug(categorySlug);

    if (!category) {
        notFound();
    }

    return (
        <>
            <LayoutComCabecalho
                cabecalho={{
                    subtitulo: "Categoria",
                    titulo: category.name,
                    descricao: `Há <span>${category.count}</span> post(s) publicados nesta categoria.`,
                }}
            >
                {children}
            </LayoutComCabecalho>
        </>
    );
}