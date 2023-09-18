// userQuery.js
import { graphql } from 'gatsby'
import OrdersPage from '../containers/User'

export default OrdersPage

export const pageQuery = graphql`
  query PostPageQuery {
    allBlockContent(
      filter: { page: { in: ["innerpage/blog", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
}
`