import Link from "next/link";
import PostService from "@/lib/services/PostService";

export default async function Page({ searchParams }) {
    const { search } = searchParams;
    let posts = null;
    if (search) {
        posts = await PostService.search(search);
    }
    return (
        <>
            <h1>Pesquisar conteúdos do blog</h1>
            <div className="border-bottom mb-5">
                <form>
                    <div className="input-group">
                        <input
                            type="search"
                            name="search"
                            id="search"
                            defaultValue={search}
                            placeholder="Informe o critério de busca"
                            className="form-control"
                        />
                        <button className="btn btn-outline-secondary" type="submit">
                            Pesquisar
                        </button>
                    </div>
                </form>
            </div>
            {posts?.edges?.length > 0 && (
                <>
                    <ul className="list-unstyled">
                        {posts.edges.map((post) => (
                            <li key={post.node.databaseId}>
                                <Link
                                    className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
                                    href={`/${post.node.categories.nodes[0].slug}/${post.node.slug}`}
                                >
                                    {post.node.featuredImage && (
                                        <div
                                            style={{
                                                width: 96,
                                                height: 96,
                                                backgroundImage: `url(${post.node.featuredImage.node.sourceUrl})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center center",
                                            }}
                                        ></div>
                                    )}
                                    {!post.node.featuredImage && (
                                        <svg
                                            className="bd-placeholder-img"
                                            width="96"
                                            height="96"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            preserveAspectRatio="xMidYMid slice"
                                            focusable="false"
                                        >
                                            <rect width="100%" height="100%" fill="#777"></rect>
                                        </svg>
                                    )}
                                    <div className="col-lg-8">
                                        <h3 className="mb-0">{post.node.title}</h3>
                                        <small className="text-body-secondary">
                                            {new Date(post.node.date).toLocaleString("pt-br", {
                                                month: "long",
                                                day: "2-digit",
                                                year: "numeric",
                                            })}
                                        </small>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

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
                </>
            )}
            {posts?.edges?.length == 0 && (
                <div className="alert alert-warning">
                    ⚠️ Nenhum resultado encontrado para o critério informado
                </div>
            )}
        </>
    );
}
