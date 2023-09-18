import React, { useEffect } from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider, merge, Flex, Box, css } from 'theme-ui'
import baseTheme from '@solid-ui-theme'
import pageContextProvider from '@helpers/pageContextProvider'
import { FormContextProvider } from '@solid-ui-components/ContentForm'
import ThreeCX from '@solid-ui-components/ThreeCX'
import { ModalContextProvider } from '@solid-ui-components/Modal'
import { TabsContextProvider } from '@solid-ui-components/Tabs'
import { navigate } from 'gatsby'
import { handleLogout } from '../../../../themes/gatsby-theme-flexiblocks/src/utils/functions'
import './css/global.css'

const auth = localStorage.getItem("auth")
const parsedData = JSON.parse(auth);

const Layout = ({ children, pageContext = {}, location, theme = {} }) => {
  useEffect(() => {
    // Check if the token is expired
    if (parsedData && parsedData.user.jwtAuthExpiration) {
      // const currentTime = Date.now() / 1000; // Get current timestamp in seconds
      // if (currentTime >= parsedData.user.jwtAuthExpiration) {
      //   // Token has expired, log out the user and redirect
      //   handleLogout(); // Implement your logout function
      //   navigate('/'); // Redirect to the homepage
      // }
    }
  }, []);
  return (
    <ThemeProvider theme={merge(baseTheme, theme)}>
      <pageContextProvider.Provider value={{ pageContext, location }}>
        <FormContextProvider>
          <ModalContextProvider>
            <TabsContextProvider>
              <Flex variant='layout.layout'>
                <Global styles={css(theme => theme.global)} />
                <Box variant='layout.body'>
                  {children}
                  <ThreeCX />
                </Box>
              </Flex>
            </TabsContextProvider>
          </ModalContextProvider>
        </FormContextProvider>
      </pageContextProvider.Provider>
    </ThemeProvider>
  )
}

export default Layout
