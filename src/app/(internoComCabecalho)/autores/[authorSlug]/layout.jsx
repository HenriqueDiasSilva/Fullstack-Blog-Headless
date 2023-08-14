import UserService from "@/lib/services/UserService";
import { notFound } from "next/navigation";
import LayoutComCabecalho from "../../../Layouts/LayoutComCabecalho";

export default async function Layout({ children, params }) {
    const { authorSlug } = params;
    const user = await UserService.findBySlug(authorSlug);
    if (!user) {
        notFound();
    }
    return (
        <>
            <LayoutComCabecalho
                cabecalho={{ subtitulo: "Autores", titulo: user.name }}
            >
                {children}
            </LayoutComCabecalho>
        </>
    );
}