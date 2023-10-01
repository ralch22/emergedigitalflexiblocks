import ProductPage from '../containers/Product'
import { graphql } from 'gatsby'

export default function Product(props) {
  return <ProductPage {...props} />
}

export const pageQuery = graphql`
  query CasePageQuery {
    allBlockContent(filter: { page: { in: ["innerpage/blog", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`
