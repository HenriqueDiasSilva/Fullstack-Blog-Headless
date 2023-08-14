import PostService from "@/lib/services/PostService";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const { categorySlug, postSlug } = params;
    const post = await PostService.findBySlug(postSlug);
    if (!post) {
        notFound();
    }
    return (
        <>
            <h1 className="display-3 fw-bold">{post.title}</h1>
            <div
                className="fs-4 text-muted"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
            ></div>
            <p className="blog-post-meta mb-5 mt-4 pb-5 border-bottom">
                {new Date(post.date).toLocaleString("pt-br", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                })}{" "}
                &bull; 👤 por{" "}
                <Link href={`/autores/${post.author.node.slug}`}>
                    {post.author.node.name}
                </Link>
                &nbsp; &bull; &nbsp;
                <span>📁 Categoria: </span>
                {post.categories.nodes.map((category) => (
                    <Link
                        key={category.databaseId}
                        href={`/${category.slug}`}
                        className="me-2"
                    >
                        {category.name}
                    </Link>
                ))}
            </p>

            {post.featuredImage && (
                <div
                    style={{
                        width: "100%",
                        height: 400,
                        backgroundImage: `url(${post.featuredImage.node.sourceUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        marginBottom: "5rem",
                    }}
                ></div>
            )}

            <div className="mb-5" dangerouslySetInnerHTML={{ __html: post.content }}></div>

            {post.tags.nodes.length > 0 && (
                <div className="border-top my-5 pt-4">
                    🏷️ &nbsp;
                    {post.tags.nodes.map((tag) => (
                        <Link
                            key={tag.databaseId}
                            href={`/tags/${tag.slug}`}
                            className="me-2 badge bg-secondary bg-opacity-25 text-dark fw-normal fs-6 text-decoration-none"
                        >
                            {tag.name}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}