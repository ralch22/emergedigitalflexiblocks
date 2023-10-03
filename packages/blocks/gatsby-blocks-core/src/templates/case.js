import { graphql } from 'gatsby';
import CasePage from '../containers/Case';

export default CasePage;

export const pageQuery = graphql`
  query CasePageQuery {
    allBlockContent(filter: { page: { in: ["innerpage/blog", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`;
