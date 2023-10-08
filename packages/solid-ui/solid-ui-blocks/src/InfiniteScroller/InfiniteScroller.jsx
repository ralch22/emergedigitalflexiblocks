import React, { useEffect, useState } from 'react';
import CardList from '@solid-ui-components/CardList';
import Reveal from '@solid-ui-components/Reveal';
import { Spinner } from 'theme-ui';

const InfiniteLoopPagination = ({ data }) => {
  const [itemsToShow, setItemsToShow] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  const loadMoreItems = () => {
    setIsLoading(true);

    // Simulate an API call or data fetching
    setTimeout(() => {
      const nextItemsToShow = itemsToShow + 5;
      if (nextItemsToShow >= data.length) {
        setReachedEnd(true); // Set reachedEnd to true if all items are shown
      } else {
        setItemsToShow(nextItemsToShow);
      }
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Load more items when the user scrolls to the bottom
    const handleScroll = () => {
      if (
        !reachedEnd &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight &&
        !isLoading
      ) {
        loadMoreItems();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, reachedEnd]);

  return (
    <div>
      <ul>
        <CardList
          nodes={data}
          variant={['horizontal-md', 'vertical']}
          columns={[1, 2, 3, 3]}
        />
      </ul>
      {isLoading && (
        <Reveal effect="fadeInDown">
          <Spinner size="64" color="alpha" />
        </Reveal>
      )}
      {reachedEnd && <p></p>}
    </div>
  );
};

export default InfiniteLoopPagination
