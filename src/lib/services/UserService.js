import fetchAPI from "../http";

const USER_PAGE_POSTS_COUNT = 10;

const UserService = {
    async findBySlug(slug) {
        const { user } = await fetchAPI(
            `
    query NewQuery($id: ID = "") {
      user(id: $id, idType: SLUG) {
        email
        databaseId
        name
        slug
        description
        avatar {
          foundAvatar
          url
        }
      }
    }
          `,
            { variables: { id: slug } }
        );
        return user;
    },

    async findBySlugWithPosts(
        slug,
        after,
        before,
        first = USER_PAGE_POSTS_COUNT,
        last = USER_PAGE_POSTS_COUNT
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

        const { user } = await fetchAPI(
            `
    query NewQuery($id: ID!, $after: String = "", $before: String = "", $first: Int, $last: Int) {
      user(id: $id, idType: SLUG) {
        email
        databaseId
        name
        slug
        description
        avatar {
          foundAvatar
          url
        }
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
              databaseId
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
    }
      `,
            { variables }
        );
        return user;
    },
};

export default UserService;
