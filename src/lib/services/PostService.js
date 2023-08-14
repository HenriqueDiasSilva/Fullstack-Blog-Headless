import fetchAPI from "../http";

const HOME_PAGE_POSTS_COUNT = 3;
const SEARCH_PAGE_POSTS_COUNT = 10;

const PostService = {
    async recentPosts(first = 3) {
        const { posts } = await fetchAPI(
            `
          query NewQuery($first: Int) {
            posts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
              edges {
                cursor
                node {
                  featuredImage {
                    node {
                      sourceUrl(size: THUMBNAIL)
                    }
                  }
                  date
                  slug
                  title
                  postId
                  categories {
                    nodes {
                      databaseId
                      name
                      slug
                    }
                  }
                }
              }
            }
          }
        `,
            {
                variables: {
                    first,
                },
            }
        );
        return posts;
    },

    async findBySlug(slug) {
        const { post } = await fetchAPI(
            `
          query NewQuery($id: ID = "") {
            post(id: $id, idType: SLUG) {
              author {
                node {
                  name
                  slug
                }
              }
              content
              excerpt
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              databaseId
              slug
              title
              date
              categories {
                nodes {
                  databaseId
                  name
                  slug
                }
              }
              tags(where: {orderby: NAME}) {
                nodes {
                  name
                  slug
                  databaseId
                }
              }
            }
          }
        `,
            { variables: { id: slug } }
        );
        return post;
    },

    async findAll(
        after,
        before,
        first = HOME_PAGE_POSTS_COUNT,
        last = HOME_PAGE_POSTS_COUNT
    ) {
        let variables = {};
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
    query NewQuery($first:Int, $after: String = "", $last:Int, $before: String = "") {
      posts(
        where: {orderby: {field: DATE, order: DESC}}
        after: $after
        first: $first
        before: $before
        last: $last
      ) {
        edges {
          node {
            author {
              node {
                name
                slug
              }
            }
            date
            content
            title
            slug
            databaseId
            categories {
              nodes {
                databaseId
                name
                slug
              }
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
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

export default PostService;
