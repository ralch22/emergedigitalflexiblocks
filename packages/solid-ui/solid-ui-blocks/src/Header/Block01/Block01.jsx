import React, { useContext } from 'react'
import { Link as GLink, navigate } from 'gatsby'
import Sticky from 'react-sticky-el'
import pageContextProvider from '@helpers/pageContextProvider'
import { Box, Container, css, Flex } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Search from '@solid-ui-blocks/Search'
import Drawer from '@solid-ui-components/Drawer'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import { FaUser } from 'react-icons/fa'

const auth = typeof window !== 'undefined' ? localStorage.getItem('auth') : null
const parsedData = JSON.parse(auth)

const styles = {
  wrapper: {
    position: `relative`,
    zIndex: 10,
    '.nav-container': {
      bg: `headerBg`,
      position: `fixed`,
      transition: `all 250ms ease-in`,
      // overflow: `hidden`,
      py: 3
    },
    '.nav-sticky .nav-container': {
      bg: `headerActiveBg`,
      boxShadow: `0 0 25px rgba(140,152,164,.25)`,
      py: [3, null, 2],
      '.button-group-link.level-1, button-group-link.level-1:visited': {
        color: `headerActiveColor`
      }
    },
    //Make buttons in header smaller
    '.button-group-button': {
      minWidth: 120,
      fontSize: 1,
      px: 3,
      py: 1
    }
  },
  header: {
    justifyContent: `space-between`,
    alignItems: `center`
    // height: [`6rem`, `7rem`], //prevent layout shift
  },
  searchContainer: {
    flexBasis: [`auto`, null, `1/3`],
    minWidth: `auto`,
    order: [3, null, `unset`],
    mx: 3
  },
  logoContainer: {
    flexShrink: 0,
    mr: [null, null, 3, 5]
  },
  desktopMenu: {
    display: [`none`, null, `block`],
    minWidth: `auto`,
    flexGrow: 1
  },
  image: {
    width: 150
  },
  mobileMenu: {
    display: [`block`, null, `none`]
  }
}

const HeaderBlock01 = ({
  search,
  content: { images, collection, buttons },
  menuJustify
}) => {
  const context = useContext(pageContextProvider)

  const { services, mobileMenu, darkMode } = context.pageContext

  const algolia = services && services.algolia
  return (
    <>
      <Sticky
        enabled='true'
        stickyClassName='nav-sticky'
        css={css(styles.wrapper)}
      >
        <Container variant='full' className='nav-container'>
          <Container px='4'>
            <Flex sx={styles.header}>
              <Box sx={styles.logoContainer}>
                <GLink to='/'>
                  <ContentImages
                    content={{ images }}
                    sx={styles.image}
                    imageEffect='fadeIn'
                  />
                </GLink>
              </Box>
              {search && (
                <Box sx={styles.searchContainer}>{algolia && <Search />}</Box>
              )}
              {!search && (
                <>
                  {collection && (
                    <>
                      <Box sx={styles.desktopMenu}>
                        <Reveal effect='fadeInDown'>
                          <Flex
                            sx={{
                              alignItems: `center`,
                              justifyContent: menuJustify
                            }}
                          >
                            {collection.map(
                              ({ buttons }, index) =>
                                buttons && (
                                  <Box
                                    key={`item-${index}`}
                                    sx={{
                                      '& + &': {
                                        ml: 4
                                      }
                                    }}
                                  >
                                    <ContentButtons content={buttons} />
                                  </Box>
                                )
                            )}
                            {parsedData ? (
                              <Box
                                onClick={() => navigate('/dashboard')}
                                sx={{
                                  '& + &': {
                                    ml: 4
                                  },
                                  px: 4,
                                  cursor: 'pointer'
                                }}
                              >
                                <FaUser size='20px' />
                              </Box>
                            ) : (
                              <>
                                {buttons && (
                                  <Box
                                    sx={{
                                      '& + &': {
                                        ml: 4
                                      }
                                    }}
                                  >
                                    <ContentButtons content={buttons} />
                                  </Box>
                                )}
                              </>
                            )}
                          </Flex>
                        </Reveal>
                      </Box>
                      <Box sx={styles.mobileMenu}>
                        <Drawer buttonStyle={{ svg: { size: 32 } }}>
                          {collection.map(
                            ({ buttons }, index) =>
                              buttons && (
                                <Box
                                  key={`item-${index}`}
                                  sx={{
                                    fontSize: 3,
                                    '.button-group-link.level-1, button-group-link.level-1:visited':
                                      {
                                        color: `headerActiveColor`
                                      }
                                  }}
                                >
                                  <ContentButtons
                                    content={buttons}
                                    variant='vertical'
                                  />
                                </Box>
                              )
                          )}
                          {parsedData ? (
                            <Box
                              onClick={() => navigate('/dashboard')}
                              sx={{
                                '& + &': {
                                  ml: 4
                                },
                                cursor: 'pointer'
                              }}
                            >
                              <FaUser size='20px' />
                            </Box>
                          ) : (
                            <>
                              {buttons && (
                                <Box
                                  sx={{
                                    '& + &': {
                                      ml: 4
                                    }
                                  }}
                                >
                                  <ContentButtons content={buttons} />
                                </Box>
                              )}
                            </>
                          )}
                        </Drawer>
                      </Box>
                    </>
                  )}
                </>
              )}
            </Flex>
          </Container>
        </Container>
      </Sticky>
    </>
  )
}

HeaderBlock01.defaultProps = {
  menuJustify: `flex-end`
}

export default WithDefaultContent(HeaderBlock01)
