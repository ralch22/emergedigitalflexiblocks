import React from 'react'
import { Link } from 'gatsby'
import { Box, Flex, Text, Heading } from 'theme-ui'

const styles = {
  wrapper: {
    bg: `omegaLight`,
    borderRadius: `bottom`,
    color: `omegaDark`,
    borderStyle: `solid`,
    borderWidth: `md`,
    borderColor: `contentBg`,
    mx: -4,
    mb: -4,
    mt: 4,
  },
  flex: {
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    p: 4,
  },
  item: {
    flexBasis: `50%`,
  },
  next: {
    textAlign: `right`,
  },
  guide: {
    mb: 2,
  },
}

const PostLink = ({ title, post }) => (
  <>
    <Text sx={styles.guide} dangerouslySetInnerHTML={{ __html: title }} />
    <Heading variant='h4' as={Link} to={`/posts/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title }}  />
  </>
)

export const PostFooter = ({ previous, next }) => {
  if (!next && !previous) return null

  return (
    <Box sx={styles.wrapper}>
      <Flex sx={styles.flex}>
        <Box sx={styles.item}>
          {previous && <PostLink post={previous} title='Previous Article' />}
        </Box>
        <Box sx={{ ...styles.item, ...styles.next }}>
          {next && <PostLink post={next} title='Next Article' />}
        </Box>
      </Flex>
    </Box>
  )
}
