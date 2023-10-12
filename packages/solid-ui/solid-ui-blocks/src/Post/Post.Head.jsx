import React from 'react';
import { Link as GLink } from 'gatsby';
import { Badge, Box, Flex, Link, Text } from 'theme-ui';
import TextList from '@solid-ui-components/TextList';
import PageTitle from '@solid-ui-components/PageTitle';

const styles = {
  item: {
    display: `inline-block`,
  },
};

export const PostHead = ({ title, author, date, timeToRead, categories }) => {
  const info = (
    <TextList>
      {author && author.node.slug && (
        <Text sx={styles.item}>
          {`By `}
          <Link variant="mute" as={GLink} to={`/author/${author.node.slug}`}>
            <strong dangerouslySetInnerHTML={{ __html: author.node.name }} />
          </Link>
        </Text>
      )}
      <Flex>
        <Text sx={styles.item}>
          <Flex>
            {`Published in `}
            {categories.nodes.map(({ name, slug }) => {
              return (
                <Box sx={{ ml: 2 }}>
                  <Badge variant="tag-dark">{name}</Badge>
                </Box>
              );
            })}
          </Flex>
        </Text>
      </Flex>
      {date && <Text sx={styles.item}>{date}</Text>}
      {/* {timeToRead && (
        <Text sx={{ ...styles.item, color: `error` }}>
          <strong>{timeToRead} min read</strong>
        </Text>
      )} */}
    </TextList>
  );

  return <PageTitle header={title} running={info} />;
};
