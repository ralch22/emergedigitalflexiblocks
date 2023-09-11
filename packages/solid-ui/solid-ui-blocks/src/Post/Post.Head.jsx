import React from 'react'
import { Link as GLink } from 'gatsby'
import { Link, Text, Flex, Box, Badge } from 'theme-ui'
import TextList from '@solid-ui-components/TextList'
import PageTitle from '@solid-ui-components/PageTitle'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'

const styles = {
  item: {
    display: `inline-block`
  }
}

export const PostHead = ({ title, author, date, timeToRead, categories }) => {
  const info = (
    <TextList>
      {author && author.slug && (
        <Text sx={styles.item}>
          {`By `}
          <Link variant='mute' as={GLink} to={author.slug}>
            <strong dangerouslySetInnerHTML={{ __html: author.name }} />
          </Link>
        </Text>
      )}
      <Flex>
      <Text sx={styles.item}>
        <Flex>
        {`Published in `}
        {categories.nodes.map(({ name, slug }) => {
          return(
            <Box sx={{ ml: 2 }}>
              <Badge
                variant='tag'
                as={Link}
                to={slug}
              >
                {name}
              </Badge>
          </Box>
          )
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
  )

  return <PageTitle header={title} running={info} />
}
