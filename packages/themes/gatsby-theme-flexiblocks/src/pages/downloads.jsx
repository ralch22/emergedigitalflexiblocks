import React, { useEffect } from 'react';
import Layout from '@solid-ui-layout/Layout';
import Stack from '@solid-ui-layout/Stack/Stack';
import Main from '@solid-ui-layout/Main/Main';
import Footer from '@solid-ui-blocks/Footer/Block01';
import Seo from '@solid-ui-blocks/Seo';
import { useSelector, useDispatch } from 'react-redux';
import Header from '@solid-ui-blocks/Header/Block01';
import SubsTable from '@solid-ui-blocks/SubsTable';
import { Box, Flex, Text, Heading, Card, Button } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import { navigate, graphql, Link } from 'gatsby';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import { handleLogout } from '../utils/functions';
import { fetchDownloads } from '../store/ducks/downloadSlice';

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

export default function Downloads({ data: { allBlockContent }, ...props }) {
  const dispatch = useDispatch();
  const downloads = useSelector(state => state.downloads.allDownloads);
  useEffect(() => {
    dispatch(fetchDownloads({ id: parsedData && parsedData.user.id }));
    // Dispatch actions for other entities here
  }, [dispatch]);
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
  console.log('downloads:', downloads);
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  //   const { data: userData } = userResult;

  return (
    <Layout {...props}>
      <Header content={content['header']} />
      <Divider spaceY={5} />
      <Divider spaceY={5} />

      <Flex sx={{ height: '70vh' }}>
        <Box sx={{ pl: `3`, height: '100%', flexBasis: `1/4` }}>
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
            <Box style={{ cursor: 'pointer' }} onClick={handleLogout}>
              Logout
            </Box>
          </Card>
        </Box>
        <Main sx={{ height: '100%' }}>
          <Flex sx={{ height: '100%' }}>
            {/* Main Content */}
            <Card
              sx={{
                flex: 1,
                p: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {downloads.length !== 0 ? (
                ''
              ) : (
                <>
                  <Text>You don't have any active downloadscription</Text>
                  <Divider />
                  <Button
                    sx={{ width: '200px' }}
                    onClick={() => navigate('/all-products')}
                    variant="secondary"
                  >
                    Browse Product
                  </Button>
                </>
              )}
            </Card>
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
      filter: { page: { in: ["homepage/marketing", "shared"] } }
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
