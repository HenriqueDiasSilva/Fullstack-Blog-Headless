import fetchAPI from "../http";

const TAG_PAGE_POSTS_COUNT = 10;

const TagService = {
    async findBySlug(slug) {
        const { tag } = await fetchAPI(
            `
          query NewQuery($id: ID = "") {
            tag(id: $id, idType: SLUG) {
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
        return tag;
    },

    async findBySlugWithPosts(
        slug,
        after,
        before,
        first = TAG_PAGE_POSTS_COUNT,
        last = TAG_PAGE_POSTS_COUNT
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

        const { tag } = await fetchAPI(
            `
    query NewQuery($id: ID = "", $after: String = "", $before: String = "", $first: Int, $last: Int) {
      tag(id: $id, idType: SLUG) {
        count
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
              databaseId
              slug
              title
              featuredImage {
                node {
                  sourceUrl(size: THUMBNAIL)
                }
              }
              categories {
                nodes {
                  name
                  slug
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

        return tag;
    },
};

export default TagService;
