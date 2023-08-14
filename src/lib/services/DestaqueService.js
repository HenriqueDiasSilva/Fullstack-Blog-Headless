import fetchAPI from "../http";

const DestaqueService = {
    async findActive() {
        const { destaques } = await fetchAPI(
            `
query NewQuery {
  destaques(first: 1) {
    nodes {
      destaquePrincipal {
        node {
          databaseId
          date
          excerpt
          slug
          title
          featuredImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
          categories(first: 1) {
            nodes {
              name
              slug
            }
          }
        }
      }
      destaqueSecundario1 {
        node {
          databaseId
          date
          excerpt
          slug
          title
          featuredImage {
            node {
              sourceUrl(size: MEDIUM_LARGE)
            }
          }
          categories(first: 1) {
            nodes {
              name
              slug
            }
          }
        }
      }
      destaqueSecundario2 {
        node {
          databaseId
          date
          excerpt
          slug
          title
          featuredImage {
            node {
              sourceUrl(size: MEDIUM_LARGE)
            }
          }
          categories(first: 1) {
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
    `
        );
        return destaques.nodes[0];
    },
};

export default DestaqueService;
