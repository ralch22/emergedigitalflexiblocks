import React from 'react';
import { Highlight, Snippet, connectStateResults, PoweredBy } from 'react-instantsearch-dom';
import { Heading, Box, Spinner } from 'theme-ui';
import Card from '@solid-ui-components/Card';
import useScrollDisabler from '@solid-ui-components/useScrollDisabler';
import styles from './Search.styles';

const Hits = ({ searchState, searchResults }) => {
  useScrollDisabler();

  if (!searchResults || !searchState.query) {
    return 'What are you looking for?';
  }

  if (searchResults.query !== searchState.query) {
    // Waiting for search request to return results from server
    return <Spinner strokeWidth={2} duration={700} sx={styles.spinner} />;
  }

  const hits = searchResults.hits;

  if (!hits || hits.length === 0) {
    return `No results for '${searchResults.query}'`;
  } else {
    return (
      <Box sx={styles.hitsWrapper}>
        {hits.map(hit => (
          <Card
            key={hit.objectID} // Use a unique key for each result
            title={
              <Highlight hit={hit} tagName="mark" attribute="title" />
            }
            excerpt={
              <Snippet hit={hit} tagName="mark" attribute="excerpt" />
            }
            // Add other props as needed
          />
        ))}
        <Box sx={styles.poweredBy}>
          <PoweredBy />
        </Box>
      </Box>
    );
  }
};

const ConnectedHits = connectStateResults(Hits);

const Results = () => (
  <Box sx={styles.resultsWrapper}>
    <ConnectedHits />
  </Box>
);

export default Results;
