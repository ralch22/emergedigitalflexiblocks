import Product from '../containers/Product';
import { graphql } from 'gatsby';

export default Product;

export const pageQuery = graphql`
  query CasePageQuery {
    allBlockContent(filter: { page: { in: ["innerpage/blog", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`;
