import React, { useState, useEffect } from 'react'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import { useStaticQuery, graphql } from 'gatsby'
import { Box, IconButton } from 'theme-ui'
import { FaTimes } from 'react-icons/fa'
import SearchBox from './Search.Box'
import Results from './Search.Results'
import styles from './Search.styles'

const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME || 'Posts'
const searchDistinctLimit = 4

const Overlay = ({ onClick }) => (
  <>
    <Box sx={styles.overlay} onClick={onClick} />
    <Box sx={styles.close}>
      <IconButton onClick={onClick}>
        <FaTimes />
      </IconButton>
      <Box sx={styles.esc}>ESC</Box>
    </Box>
  </>
)


 
const Search = ({ isFocused = false }) => {
  const [focus, setFocus] = useState(true)

  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  const data = useStaticQuery(graphql`
  query {
    allWpPost {
      nodes {
        objectID: id
        title
        content
        slug
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`);

const posts = data.allWpPost.nodes.map((node) => ({
  objectID: node.objectID,
  title: node.title,
  excerpt: node.content,
  slug: node.slug,
  category: node.categories.nodes.map((category) => category.name).join(', '),
}));


console.log("posts", posts)
  const searchClient = {
    search(requests) {
      const shouldSearch = requests.some(
        ({ params: { query } }) => query !== ''
      )
      
        return algoliaClient
          .search(requests)
          .then((response) => {
            return response; // Return Algolia's search results
          })
          .catch((error) => {
            console.error('Algolia search error:', error);
            return {
              results: [{ hits: [] }], // Return an empty hits array on error
            };
          });
     
    }
  }

  const handleClose = () => setFocus(false)
  const handleFocus = () => !focus && setFocus(true)

  return (
    <Box>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure distinct={searchDistinctLimit} />
        <SearchBox
          focus={focus}
          handleFocus={handleFocus}
          handleClose={handleClose}
        />
        {focus && <Results />}
      </InstantSearch>
      {focus && (
        <>
          <Overlay onClick={handleClose} />
        </>
      )}
    </Box>
  )
}

export default Search
