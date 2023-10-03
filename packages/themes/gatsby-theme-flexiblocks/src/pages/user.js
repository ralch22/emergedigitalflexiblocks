import React, { useEffect } from 'react';
import Layout from '@solid-ui-layout/Layout';
import Main from '@solid-ui-layout/Main/Main';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Header from '@solid-ui-blocks/Header/Block01';
import SubsTable from '@solid-ui-blocks/SubsTable';
import { Box, Flex, Text, Heading, Card, Button } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import { navigate, graphql, Link } from 'gatsby';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import { handleLogout } from '../utils/functions';
import User from '@solid-ui-blocks/User/Block01/Block01';

const auth =
  typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
const parsedData = JSON.parse(auth);
// export const USER_QUERY = gql`
// query GetUser($userId: ID!) {
//     user(id: $userId) {
//       id
//       name
//       email
//     }
//   }
// `;

export default function user({ data: { allBlockContent }, ...props }) {
  useEffect(() => {
    // Check if the token is expired
    if (parsedData && parsedData.user.authToken) {
      const currentTime = Date.now() / 1000; // Get current timestamp in seconds
      if (currentTime >= parsedData.user.authToken) {
        // Token has expired, log out the user and redirect
        handleLogout(); // Implement your logout function
        navigate('/'); // Redirect to the homepage
      }
    }
  }, []);
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  //   const { data: userData } = userResult;

  return (
    <Layout {...props}>
      <Header content={content['header']} />
      <Divider spaceY={5} />
      <Divider spaceY={5} />

      <Flex sx={{ minheight: '100vh' }}>
        <Box sx={{ pl: `3`, height: 'full', flexBasis: `1/4` }}>
          <Card
            sx={{
              width: '200px',
              height: '100%',
              p: 3,
            }}
          >
            <Heading as="h2">Dashboard</Heading>
            <Divider spaceY="5" />
            <Text>
              <Link
                style={{ color: '#718096' }}
                activeStyle={{
                  background: '#e60037',
                  padding: '5px',
                  color: 'white',
                  borderRadius: '3px',
                }}
                to="/user"
              >
                Profile
              </Link>
            </Text>
            <Box sx={{ mt: 3 }} />
            <Text>
              <Link
                style={{ color: '#718096' }}
                activeStyle={{
                  background: '#e60037',
                  padding: '5px',
                  color: 'white',
                  borderRadius: '3px',
                }}
                to="/orders"
              >
                Orders
              </Link>
            </Text>
            <Box sx={{ mt: 3 }} />
            <Text>
              <Link
                style={{ color: '#718096' }}
                activeStyle={{
                  background: '#e60037',
                  padding: '5px',
                  color: 'white',
                  borderRadius: '3px',
                }}
                to="/subscription"
              >
                Subscriptions
              </Link>
            </Text>
            <Box sx={{ mt: 3 }} />
            <Text>
              <Link
                style={{ color: '#718096' }}
                activeStyle={{
                  background: '#e60037',
                  padding: '5px',
                  color: 'white',
                  borderRadius: '3px',
                }}
                to="/address"
              >
                Address
              </Link>
            </Text>
            <Box sx={{ mt: 3 }} />
            <Text>
              <Link
                style={{ color: '#718096' }}
                activeStyle={{
                  background: '#e60037',
                  padding: '5px',
                  color: 'white',
                  borderRadius: '3px',
                }}
                to="/downloads"
              >
                Download
              </Link>
            </Text>
            <Box sx={{ mt: 3 }} />
            <Box onClick={handleLogout}>Logout</Box>
          </Card>
        </Box>
        <Main sx={{ height: '100%' }}>
          <Flex sx={{ height: '100%' }}>
            <User content={content['user']} />
            {/* Main Content */}
          </Flex>
        </Main>
      </Flex>
      <Divider />
      <Footer content={content['footer']} />
    </Layout>
  );
}

export const query = graphql`
  query homepageMarketingBlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/marketing", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
    allWpPage {
      nodes {
        nodeType
        slug
        title
        uri
        seo {
          title
          metaDesc
          focuskw
          metaKeywords
          metaRobotsNoindex
          metaRobotsNofollow
          opengraphTitle
          opengraphDescription
          opengraphImage {
            altText
            sourceUrl
            srcSet
          }
          twitterTitle
          twitterDescription
          twitterImage {
            altText
            sourceUrl
            srcSet
          }
          canonical
          cornerstone
          schema {
            articleType
            pageType
            raw
          }
        }
      }
    }
  }
`;
