import Link from "next/link";

export default function Header({ categories }) {
  return (
    <>
      <div className="container">
        <header className="border-bottom lh-1 py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <span className="small text-muted d-none d-lg-block">
                Cultura & Dev & Tech & Inovação
              </span>
              <span className="small text-muted d-lg-none">C.D.T.I</span>
            </div>
            <div className="col-4 text-center">
              <Link
                className="blog-header-logo text-body-emphasis text-decoration-none"
                href="/"
              >
                Fullstack Blog
              </Link>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <Link
                className="link-secondary"
                href="/pesquisar"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="mx-3"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <title>Search</title>
                  <circle cx="10.5" cy="10.5" r="7.5" />
                  <path d="M21 21l-5.2-5.2" />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        <div className="nav-scroller py-1 mb-3 border-bottom">
          <nav className="nav nav-underline justify-content-between">
            {categories.nodes.map((category) => (
              <Link
                key={category.slug}
                className="nav-item nav-link link-body-emphasis"
                href={`/${category.slug}`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}