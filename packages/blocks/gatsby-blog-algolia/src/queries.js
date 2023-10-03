const postQuery = `{
  posts: allWpPost {
    edges {
      node {
        objectID: id
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        excerpt
      }
    }
  }
}
`;

const flatten = arr =>
  arr.map(({ node: { ...rest } }) => ({
    ...rest,
  }));

const settings = {
  attributesToSnippet: ['excerpt:20'],
};

const queries = [
  {
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME || 'Posts',
    query: postQuery,
    settings,
    transformer: ({ data }) => flatten(data.posts.edges),
  },
];

module.exports = queries;
