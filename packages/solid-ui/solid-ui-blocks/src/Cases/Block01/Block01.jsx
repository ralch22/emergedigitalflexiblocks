import React from 'react'
import { Box, Container, Flex } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import CaseList from '@solid-ui-components/CaseList'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  wrapper: {
    flex: [`100%`, null, null, 1],
    minWidth: 300,
    maxWidth: [`none`, null, null, 500],
    cursor: `pointer`,
    p: 3
  },
  card: {
    overflow: `hidden`,
    height: `full`
  },
  content: {
    alignItems: `stretch`,
    flexDirection: [`row`, null, null, `column`],
    height: `full`
  },
  body: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    flex: 1,
    p: 4
  },
  footerWrapper: {
    alignItems: `center`
  },
  postInfo: {
    flex: 1,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    color: `omega`,
    ml: 3
  },
  imageWrapper: {
    textAlign: `center`,
    position: `relative`,
    display: `block`,
    height: `full`
  },
  image: {
    display: [`none`, `block`],
    height: `full`,
    bg: `omegaLighter`,
    borderRadius: `default`,
    minHeight: `15rem`,
    div: {
      p: `0 !important`
    }
  },
  avatar: {
    size: 42,
    bg: `omegaLighter`,
    borderRadius: `full`,
    borderStyle: `solid`,
    borderWidth: `md`,
    borderColor: `omegaLighter`,
    boxSizing: `content-box`,
    img: {
      objectPosition: 'top center !important'
    }
  }
}

const CasesBlock01 = ({
  cases,
  subscription,
  content: { text, collection, buttons }
}) => {
  return (
    <Container>
      <Box sx={{ textAlign: `center` }}>
        <ContentText content={text} />
      </Box>
      <Divider />
      <Reveal effect='fadeIn'>
        <Flex sx={{ flexWrap: `wrap`, justifyContent: `center`, m: -3 }}>
          <CaseList
            nodes={cases}
            limit={10}
            columns={[1, 1, 1, 3]}
            variant={['horizontal-md', 'horizontal', 'horizontal', 'vertical']}
          />
        </Flex>
      </Reveal>
      {buttons && (
        <>
          <Divider space={3} />
          <ContentButtons content={buttons} />
        </>
      )}
    </Container>
  )
}
export default WithDefaultContent(CasesBlock01)
