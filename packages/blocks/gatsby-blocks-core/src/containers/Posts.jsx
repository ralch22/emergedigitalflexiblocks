/**
 * Placeholder component to shadow
 */

import React from 'react'
import Layout from '@solid-ui-layout/Layout'
import Stack from '@solid-ui-layout/Stack/Stack'
import Main from '@solid-ui-layout/Main/Main'
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import { Box } from 'theme-ui'
import CardList from '@solid-ui-components/CardList'
import Divider from '@solid-ui-components/Divider'
import Seo from '@solid-ui-blocks/Seo'
import Categories from '@solid-ui-blocks/Categories'
import NewsletterExpanded from '@solid-ui-blocks/NewsletterExpanded'
import BannerHorizontal from '@solid-ui-blocks/BannerHorizontal'
import BannerVertical from '@solid-ui-blocks/BannerVertical'
import { normalizeBlockContentNodes } from '@blocks-helpers';

export default function RenderPost({
    data: { posts = {}, featuredPosts = {}, recentPosts = {}, allBlockContent },
    ...props
  }) {
    const { pageContext: { services = {} } = {} } = props

  const content = normalizeBlockContentNodes(allBlockContent?.nodes);

  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Header search content={content['header']} />
      <Divider />
      <Stack effectProps={{ effect: false }}>
        {/* <Categories categories={categories} variant='horizontal' omitTitle /> */}
      </Stack>
      <Divider />
      <Stack effectProps={{ effect: false }}>
        <Main>
          {/* <CardList
            nodes={featuredPosts.nodes}
            limit={3}
            variant='horizontal-cover'
            slider
            fade
            controlPosition='over'
            loading='eager'
            omitCategory
          /> */}
          <Divider space={2} />
          <CardList
            nodes={recentPosts.nodes}
            limit={4}
            columns={[1, 2]}
            variant='horizontal-aside'
            loading='eager'
            withModerate
          />
        </Main>
        <Box sx={{ pl: `3`, flexBasis: `1/4`, display: [null, `block`] }}>
          <BannerVertical content={content['posts']} />
        </Box>
      </Stack>
      <Divider space={5} />
      {posts.group.length &&
        posts.group.map((group, index) => (
          <React.Fragment key={`${group.categoryName}.list`}>
            {index % 1 === 0 ? (
              <Stack
                title={group.categoryName}
              >
                <Main>
                  <CardList
                    nodes={group.nodes}
                    limit={3}
                    columns={[1, 1, 1, 3]}
                    variant={[
                      'horizontal-md',
                      'horizontal',
                      'horizontal',
                      'vertical'
                    ]}
                  />
                  <Divider space={2} />
                  <CardList
                    nodes={group.nodes}
                    limit={3}
                    skip={3}
                    columns={[1, 2, 3, 3]}
                    variant={['horizontal-md', 'horizontal-aside']}
                    omitMedia
                    
                  />
                </Main>
              </Stack>
            ) : (
              <Stack
                title={group.categoryName}
                direction={['column', 'column', 'column', 'row']}
              >
                <Box
                  sx={{
                    pl: 0,
                    pr: [0, null, null, 3],
                    display: [null, `flex`],
                    flexDirection: [`column`, null, null, `row`]
                  }}
                >
                  <CardList
                    nodes={group.nodes}
                    limit={1}
                    columns={[1]}
                    variant={[
                      'horizontal-md',
                      'horizontal',
                      'horizontal',
                      'vertical'
                    ]}
                    omitCategory
                  />
                </Box>
                <Main
                  sx={{
                    display: [null, `flex`],
                    flexDirection: [`column`, null, null, `row`]
                  }}
                >
                  <Divider space={2} />
                  <CardList
                    nodes={group.nodes}
                    limit={3}
                    skip={1}
                    columns={[1, 1, 3, 1]}
                    variant={[
                      'horizontal-md',
                      'horizontal-md',
                      'horizontal-aside'
                    ]}
                    mediaType='icon'
                    omitCategory
                  />
                  <Divider space={2} />
                </Main>
                <Box
                  sx={{
                    pl: [0, null, null, 3],
                    display: [null, `flex`],
                    flexDirection: [`column`, null, null, `row`]
                  }}
                >
                  <CardList
                    nodes={group.nodes}
                    limit={1}
                    skip={4}
                    columns={[1]}
                    variant={[
                      'horizontal-md',
                      'horizontal',
                      'horizontal',
                      'vertical'
                    ]}
                    omitCategory
                  />
                </Box>
              </Stack>
            )}
            {index === 0 && (
              <>
                <Divider />
                <Stack effectProps={{ effect: false }}>
                  <BannerHorizontal />
                </Stack>
              </>
            )}
            {index !== posts.group.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      <Stack>
        <Main>
          {services.mailchimp && (
            <>
              <Divider space={5} />
              <NewsletterExpanded />
            </>
          )}
        </Main>
      </Stack>
      <Footer content={content['footer']} />
    </Layout>
  )
}
