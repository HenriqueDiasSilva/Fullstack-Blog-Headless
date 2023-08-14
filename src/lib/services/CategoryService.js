import fetchAPI from "../http";

const CATEGORY_PAGE_POSTS_COUNT = 10;

const CategoryService = {
  async findAll() {
    const { categories } = await fetchAPI(
      `
        query NewQuery {
          categories(where: {orderby: NAME, hideEmpty: true}) {
            nodes {
              count
              name
              slug
              databaseId
            }
          }
        }
      `
    );
    return categories;
  },

  async findBySlug(slug) {
    const { category } = await fetchAPI(
      `
            query NewQuery($id: ID = "") {
              category(id: $id, idType: SLUG) {
                count
                name
                slug
              }
            }
            `,
      {
        variables: {
          id: slug,
        },
      }
    );
    return category;
  },

  async findBySlugWithPosts(
    slug,
    after,
    before,
    first = CATEGORY_PAGE_POSTS_COUNT,
    last = CATEGORY_PAGE_POSTS_COUNT
  ) {
    let variables = {
      id: slug,
    };
    if (after) {
      variables.after = after;
      variables.first = first;
    }
    if (before) {
      variables.before = before;
      variables.last = last;
    } else {
      variables.first = first;
    }

    const { category } = await fetchAPI(
      `
      query NewQuery($id: ID = "", $after: String = "", $before: String = "", $first: Int, $last: Int) {
        category(id: $id, idType: SLUG) {
          count
          ancestors {
            edges {
              node {
                name
                slug
              }
            }
          }
          name
          slug
          posts(
            after: $after
            before: $before
            first: $first
            last: $last
            where: {orderby: {field: DATE, order: DESC}}
          ) {
            pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                author {
                  node {
                    name
                    slug
                  }
                }
                date
                excerpt
                postId
                slug
                title
                featuredImage {
                  node {
                    sourceUrl(size: THUMBNAIL)
                  }
                }
              }
            }
          }
        }
      }
        `,
      { variables }
    );

    return category;
  },

  async search(
    search,
    after,
    before,
    first = SEARCH_PAGE_POSTS_COUNT,
    last = SEARCH_PAGE_POSTS_COUNT
  ) {
    let variables = { search };
    if (after) {
      variables.after = after;
      variables.first = first;
    }
    if (before) {
      variables.before = before;
      variables.last = last;
    } else {
      variables.first = first;
    }
    const { posts } = await fetchAPI(
      `
      query NewQuery($after: String, $before: String, $first: Int, $last: Int, $search: String = "") {
  posts(
    where: {search: $search}
    last: $last
    first: $first
    before: $before
    after: $after
  ) {
    edges {
      node {
        id
        databaseId
        date
        excerpt
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
          }
        }
        slug
        title
        categories {
          nodes {
            databaseId
            name
            slug
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
      `,
      {
        variables,
      }
    );
    return posts;
  },

};

export default CategoryService;