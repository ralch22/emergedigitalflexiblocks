import React from 'react';
import {
  connectStateResults,
  Highlight,
  PoweredBy,
  Snippet,
} from 'react-instantsearch-dom';
import { Box, Card, Spinner, Text } from 'theme-ui';
import useScrollDisabler from '@solid-ui-components/useScrollDisabler';
import styles from './Search.styles';

const Hits = ({ searchState, searchResults }) => {
  useScrollDisabler();

  if (!searchResults || !searchState.query) {
    return 'What are you looking for?';
  }

  if (searchResults.query !== searchState.query) {
    // Waiting for search request to return results from the server
    return <Spinner strokeWidth={2} duration={700} sx={styles.spinner} />;
  }

  if (searchResults && searchResults.nbHits < 1) {
    return `No results for '${searchResults.query}'`;
  } else {
    return (
      <Box variant="lists.cards.fixed.search">
        {searchResults.hits.map(hit => {
          const node = {
            ...hit,
            key: hit.objectID,
            title: <Highlight hit={hit} tagName="mark" attribute="title" />,
            excerpt: <Snippet hit={hit} tagName="mark" attribute="excerpt" />,
          };
          return (
            <a style={{ color: 'inherit' }} href={`/${hit.slug}`}>
              <Card key={hit.objectID} variant="search">
                <Text as="h3">
                  <Highlight hit={hit} tagName="mark" attribute="title" />
                </Text>
                <Text as="p">
                  <Snippet hit={hit} tagName="mark" attribute="excerpt" />
                </Text>
              </Card>
            </a>
          );
        })}
      </Box>
    );
  }
};

const ConnectedHits = connectStateResults(Hits);

const Results = ({ posts }) => (
  <Box sx={styles.resultsWrapper}>
    <Box sx={styles.hitsWrapper}>
      <ConnectedHits />
    </Box>
    <Box sx={styles.poweredBy}>
      <PoweredBy />
    </Box>
  </Box>
);

export default Results
