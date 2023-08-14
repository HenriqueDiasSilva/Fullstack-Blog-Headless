import LayoutGeral from "./LayoutGeral";

export default async function LayoutComCabecalho({ cabecalho, children }) {
    return (
        <>
            <div className="container">
                <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
                    <div className="col-lg-6 px-0">
                        <div className="fst-italic">{cabecalho.subtitulo ?? ""}</div>
                        <h1 className="display-4 fst-italic">{cabecalho.titulo}</h1>
                        <div
                            className="text-muted small"
                            dangerouslySetInnerHTML={{ __html: cabecalho.descricao ?? "" }}
                        ></div>
                    </div>
                </div>
            </div>
            <LayoutGeral>{children}</LayoutGeral>
        </>
    );
}
