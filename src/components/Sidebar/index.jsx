import Link from "next/link";

export default function Sidebar({ recentes }) {
    return (
        <>
            <div className="position-sticky" style={{ top: "2rem" }}>
                <div className="p-4 mb-3 bg-body-tertiary rounded">
                    <h4 className="fst-italic">Sobre</h4>
                    <p className="mb-0">
                        Uma descrição sucinta e objetiva do blog, seu propósito e breve
                        história, incluindo o público-alvo tem maior chance de alcançar um
                        nível mais desejado de efetividade.
                    </p>
                </div>

                <div>
                    <h4 className="fst-italic">Posts recentes</h4>
                    <ul className="list-unstyled">
                        {recentes.edges.map((post) => (
                            <li key={post.node.slug}>
                                <Link
                                    className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
                                    href={`/${post.node.categories.nodes[0].slug}/${post.node.slug}`}
                                >
                                    {post.node.featuredImage ? (
                                        <div
                                            style={{
                                                width: 96,
                                                height: 96,
                                                backgroundImage: `url(${post.node.featuredImage.node.sourceUrl})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center center",
                                            }}
                                        ></div>
                                    ) : (
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
                                        <h6 className="mb-0">{post.node.title}</h6>
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
                </div>

                <div className="p-4">
                    <h4 className="fst-italic">Archives</h4>
                    <ol className="list-unstyled mb-0">
                        <li>
                            <a href="#">March 2021</a>
                        </li>
                        <li>
                            <a href="#">February 2021</a>
                        </li>
                        <li>
                            <a href="#">January 2021</a>
                        </li>
                        <li>
                            <a href="#">December 2020</a>
                        </li>
                        <li>
                            <a href="#">November 2020</a>
                        </li>
                        <li>
                            <a href="#">October 2020</a>
                        </li>
                        <li>
                            <a href="#">September 2020</a>
                        </li>
                        <li>
                            <a href="#">August 2020</a>
                        </li>
                        <li>
                            <a href="#">July 2020</a>
                        </li>
                        <li>
                            <a href="#">June 2020</a>
                        </li>
                        <li>
                            <a href="#">May 2020</a>
                        </li>
                        <li>
                            <a href="#">April 2020</a>
                        </li>
                    </ol>
                </div>

                <div className="p-4">
                    <h4 className="fst-italic">Elsewhere</h4>
                    <ol className="list-unstyled">
                        <li>
                            <a href="#">GitHub</a>
                        </li>
                        <li>
                            <a href="#">Twitter</a>
                        </li>
                        <li>
                            <a href="#">Facebook</a>
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
}