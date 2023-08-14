import DestaqueService from "@/lib/services/DestaqueService";
import PostService from "@/lib/services/PostService";
import Link from "next/link";
import LayoutGeral from "../Layouts/LayoutGeral";

export const revalidate = 60;

function Destaques({ destaques }) {
    return (
        <>
            <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
                <div className="col-lg-6 px-0">
                    <h1 className="display-4 fst-italic">
                        {destaques.destaquePrincipal.node.title}
                    </h1>
                    <div
                        className="lead my-3"
                        dangerouslySetInnerHTML={{
                            __html: destaques.destaquePrincipal.node.excerpt,
                        }}
                    ></div>
                    <p className="lead mb-0">
                        <Link
                            href={`/${destaques.destaquePrincipal.node.categories.nodes[0].slug}/${destaques.destaquePrincipal.node.slug}`}
                            className="text-body-emphasis fw-bold"
                        >
                            Continue lendo...
                        </Link>
                    </p>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary-emphasis">
                                {destaques.destaqueSecundario1.node.categories.nodes[0].name}
                            </strong>
                            <h3 className="mb-0">
                                {destaques.destaqueSecundario1.node.title}
                            </h3>
                            <div className="mb-1 text-body-secondary">
                                {new Date(
                                    destaques.destaqueSecundario1.node.date
                                ).toLocaleString("pt-br", {
                                    day: "2-digit",
                                    month: "long",
                                })}
                            </div>
                            <div
                                className="card-text mb-auto"
                                dangerouslySetInnerHTML={{
                                    __html: destaques.destaqueSecundario1.node.excerpt,
                                }}
                            ></div>
                            <Link
                                href={`/${destaques.destaqueSecundario1.node.categories.nodes[0].slug}/${destaques.destaqueSecundario1.node.slug}`}
                                className="icon-link gap-1 icon-link-hover stretched-link"
                            >
                                Continue lendo &gt;
                            </Link>
                        </div>
                        <div className="col-auto d-none d-lg-block">
                            <div
                                style={{
                                    width: 200,
                                    height: 250,
                                    backgroundImage: `url(${destaques.destaqueSecundario1.node.featuredImage.node.sourceUrl})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center center",
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary-emphasis">
                                {destaques.destaqueSecundario2.node.categories.nodes[0].name}
                            </strong>
                            <h3 className="mb-0">
                                {destaques.destaqueSecundario2.node.title}
                            </h3>
                            <div className="mb-1 text-body-secondary">
                                {new Date(
                                    destaques.destaqueSecundario2.node.date
                                ).toLocaleString("pt-br", {
                                    day: "2-digit",
                                    month: "long",
                                })}
                            </div>
                            <div
                                className="card-text mb-auto"
                                dangerouslySetInnerHTML={{
                                    __html: destaques.destaqueSecundario2.node.excerpt,
                                }}
                            ></div>
                            <Link
                                href={`/${destaques.destaqueSecundario2.node.categories.nodes[0].slug}/${destaques.destaqueSecundario2.node.slug}`}
                                className="icon-link gap-1 icon-link-hover stretched-link"
                            >
                                Continue lendo &gt;
                            </Link>
                        </div>
                        <div className="col-auto d-none d-lg-block">
                            <div
                                style={{
                                    width: 200,
                                    height: 250,
                                    backgroundImage: `url(${destaques.destaqueSecundario2.node.featuredImage.node.sourceUrl})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center center",
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default async function Page({ searchParams }) {
    const { after, before } = searchParams;
    const posts = await PostService.findAll(after, before);
    const destaques = await DestaqueService.findActive();

    return (
        <>
            {destaques && (
                <div className="container">
                    <Destaques destaques={destaques}></Destaques>
                </div>
            )}

            <LayoutGeral>
                <h3 className="pb-4 mb-4 fst-italic border-bottom">
                    Das profundezas dos bits
                </h3>
                {posts.edges.map((post) => (
                    <article key={post.node.databaseId} className="blog-post">
                        <h2 className="display-5 link-body-emphasis mb-1">
                            {post.node.title}
                        </h2>
                        <p className="blog-post-meta">
                            {new Date(post.node.date).toLocaleString("pt-br", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                            })}{" "}
                            por{" "}
                            <Link href={`/autores/${post.node.author.node.slug}`}>
                                {post.node.author.node.name}
                            </Link>
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: post.node.content }}></div>
                    </article>
                ))}

                <nav className="blog-pagination" aria-label="Pagination">
                    {posts.pageInfo.hasNextPage && (
                        <Link
                            href={`?after=${posts.pageInfo.endCursor}`}
                            className="btn btn-outline-primary rounded-pill"
                        >
                            ⬅️ Mais antigos
                        </Link>
                    )}
                    {posts.pageInfo.hasPreviousPage && (
                        <Link
                            href={`?before=${posts.pageInfo.startCursor}`}
                            className="btn btn-outline-primary rounded-pill"
                        >
                            Mais recentes ➡️
                        </Link>
                    )}
                </nav>
            </LayoutGeral>
        </>
    );
}