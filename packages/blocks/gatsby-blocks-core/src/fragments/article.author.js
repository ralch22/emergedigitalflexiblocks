import { graphql } from 'gatsby'

export const query = graphql`
  fragment ArticleAuthor on ArticleAuthor {
    id
    name
    slug
    description
  }
`
