import CategoryService from "@/lib/services/CategoryService";
import Link from "next/link";

export default async function Page() {
    const categories = await CategoryService.findAll();
    return (
        <>
            <h1>Categorias</h1>
            <p>
                Essas são as categorias de posts do blog. A lista também apresenta a
                quantidade de posts publicados em cada categoria.
            </p>
            <ul className="list-unstyled">
                {categories.nodes.map((category) => (
                    <li key={category.databaseId}>
                        <Link href={`/${category.slug}`}>
                            <h5>
                                {category.name} (<span>{category.count}</span>)
                            </h5>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}