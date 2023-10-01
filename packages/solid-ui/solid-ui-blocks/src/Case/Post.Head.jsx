import React from 'react'
import { Link as GLink } from 'gatsby'
import { Link, Text, Flex, Box, Badge } from 'theme-ui'
import TextList from '@solid-ui-components/TextList'
import PageTitle from '@solid-ui-components/PageTitle'
import rv from '@solid-ui-components/utils/buildResponsiveVariant'
import { format } from 'date-fns'

const styles = {
  item: {
    display: `inline-block`
  }
}

export const PostHead = ({ title, date }) => {
  const info = (
    <TextList>
      {date && (
        <Text sx={styles.item}>{format(new Date(date), 'MMMM dd, yyyy')}</Text>
      )}
      {/* {timeToRead && (
        <Text sx={{ ...styles.item, color: `error` }}>
          <strong>{timeToRead} min read</strong>
        </Text>
      )} */}
    </TextList>
  )

  return <PageTitle header={title.rendered} running={info} />
}
