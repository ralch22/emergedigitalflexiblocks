import React from 'react';
import { Global } from '@emotion/core';
import { Box, css, Flex, merge, ThemeProvider } from 'theme-ui';
import baseTheme from '@solid-ui-theme';
import { graphql, useStaticQuery } from 'gatsby';
import pageContextProvider from '@helpers/pageContextProvider';
import { FormContextProvider } from '@solid-ui-components/ContentForm';
import ThreeCX from '@solid-ui-components/ThreeCX';
import { ModalContextProvider } from '@solid-ui-components/Modal';
import { TabsContextProvider } from '@solid-ui-components/Tabs';
import { SEOContext } from 'gatsby-plugin-wpgraphql-seo';
import './css/global.css';
import 'react-tabs/style/react-tabs.css';
import 'react-loading-skeleton/dist/skeleton.css';

const Layout = ({ children, pageContext = {}, location, theme = {} }) => {
  const {
    wp: { seo },
  } = useStaticQuery(graphql`
    query SiteInfoQuery {
      wp {
        seo {
          contentTypes {
            post {
              title
              schemaType
              metaRobotsNoindex
              metaDesc
            }
            page {
              metaDesc
              metaRobotsNoindex
              schemaType
              title
            }
          }
          webmaster {
            googleVerify
            yandexVerify
            msVerify
            baiduVerify
          }
          schema {
            companyName
            personName
            companyOrPerson
            wordpressSiteName
            siteUrl
            siteName
            inLanguage
            logo {
              sourceUrl
              mediaItemUrl
              altText
            }
          }
          social {
            facebook {
              url
              defaultImage {
                sourceUrl
                mediaItemUrl
              }
            }
            instagram {
              url
            }
            linkedIn {
              url
            }
            mySpace {
              url
            }
            pinterest {
              url
              metaTag
            }
            twitter {
              username
              cardType
            }
            wikipedia {
              url
            }
            youTube {
              url
            }
          }
        }
      }
    }
  `);
  return (
    <ThemeProvider theme={merge(baseTheme, theme)}>
      <pageContextProvider.Provider value={{ pageContext, location }}>
        <FormContextProvider>
          <ModalContextProvider>
            <TabsContextProvider>
              <SEOContext.Provider value={{ global: seo }}>
                <Flex variant="layout.layout">
                  <Global styles={css(theme => theme.global)} />
                  <Box variant="layout.body">
                    {children}
                    <ThreeCX />
                  </Box>
                </Flex>
              </SEOContext.Provider>
            </TabsContextProvider>
          </ModalContextProvider>
        </FormContextProvider>
      </pageContextProvider.Provider>
    </ThemeProvider>
  );
};

export default Layout
