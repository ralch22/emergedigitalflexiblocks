import { useStaticQuery, graphql } from 'gatsby'
import dedupe from 'dedupe'

export const useBlogCategories = () => {
  const { allWpCategory } = useStaticQuery(categoriesQuery)
  const value = allWpCategory
    ? dedupe(allWpCategory.nodes, node => node.slug)
    : null
  return value
}

const categoriesQuery = graphql`
  query allArticleCategoryQuery {
    allWpCategory {
      nodes {
        id
        name
        slug
      }
    }
  }
`