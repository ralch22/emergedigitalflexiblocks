// userQuery.js
import { graphql } from 'gatsby';
import UserPage from '../containers/User';

export default UserPage;

export const pageQuery = graphql`
  query PostPageQuery {
    allBlockContent(filter: { page: { in: ["innerpage/blog", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`;
