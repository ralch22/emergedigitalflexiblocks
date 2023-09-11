import React from 'react'
import { Link as GLink } from 'gatsby'
import { Box, Heading, Card, Link, Text } from 'theme-ui'
import Navigation from '@solid-ui-components/Navigation'
import Section from '@solid-ui-components/Section'
import Avatar from '@solid-ui-components/Avatar'
import attachSocialIcons from '@helpers/attachSocialIcons'

const styles = {
  wrapper: {
    textAlign: `center`
  },
  avatarWrapper: {
    mb: 4
  },
  title: {
    color: `omegaDark`
  }
}

const AuthorCompact = ({ author, omitSocial, ...props }) => {
  if (!author) return ''

  return (
    <Section aside title='The Author' {...props}>
      <Card variant='paper'>
        <Box sx={styles.wrapper}>
          {author.url && (
            <Box sx={styles.avatarWrapper}>
              <Link as={GLink} to={author.slug} aria-label={author.name}>
                <Avatar
                  avatar={author.url}
                  alt={author.name}
                  withPattern
                />
              </Link>
            </Box>
          )}
          <Link as={GLink} to={author.slug}>
            <Heading variant='h3'>{author.name}</Heading>
          </Link>
          <Text variant='h4' sx={styles.title}>
            {author.description}
          </Text>
          {!omitSocial && author.social && (
            <Navigation
              variant='horizontal'
              items={attachSocialIcons(author.social)}
              iconOnly
            />
          )}
        </Box>
      </Card>
    </Section>
  )
}

export default AuthorCompact
