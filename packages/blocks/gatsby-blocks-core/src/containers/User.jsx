// no-op
import React, { useEffect } from 'react';
import Layout from '@solid-ui-layout/Layout';
import Main from '@solid-ui-layout/Main/Main';
import Footer from '@solid-ui-blocks/Footer/Block01';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../gatsby-theme-flexiblocks/src/store/ducks/orderSlice';
import Header from '@solid-ui-blocks/Header/Block01';
import OrdersTable from '@solid-ui-blocks/OrdersTable';
import { Box, Card, Container, Flex, Heading, Text } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import { graphql, Link, navigate } from 'gatsby';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import { handleLogout } from '../../../../themes/gatsby-theme-flexiblocks/src/utils/functions';
import SubsTable from '@solid-ui-blocks/SubsTable';
import Address from '@solid-ui-blocks/Address/Block01';
import { fetchSubs } from '../store/ducks/subsSlice';
import CustomTabSwitcher from '@solid-ui-blocks/Content/Tabs';

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

function Profile() {
  return (
    <Box sx={{ flex: 1, p: 3 }}>
      {parsedData ? (
        <Box>
          {auth && (
            <Text as="medium">
              {' '}
              Hello <strong>{parsedData.user.name}</strong> (not{' '}
              <strong>{parsedData.user.name}</strong>? Log out) From your
              account dashboard you can view your recent orders, manage your
              shipping and billing addresses, and edit your password and account
              details
            </Text>
          )}
        </Box>
      ) : (
        <Text>Loading user data...</Text>
      )}
      {/* Add dashboard content here */}
    </Box>
  );
}

export default function Profile({ data: { allBlockContent }, ...props }) {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.allOrders);
  const subs = useSelector(state => state.subs.allSubs);
  useEffect(() => {
    dispatch(fetchSubs({ id: parsedData && parsedData.user.id }));
    dispatch(fetchOrders({ id: parsedData && parsedData.user.id }));
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
  console.log('products:', orders);
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  //   const { data: userData } = userResult;
  const tabs = [
    { title: 'UAE', content: <SubsTable subs={subs} /> },
    { title: 'AUS', content: <OrdersTable orders={orders} /> },
    {
      title: 'AUS',
      content: <Address checkout content={content['address']} />,
    },
    { title: 'AUS', content: <Profile /> },
  ];
  return (
    <Layout {...props}>
      <Header content={content['header']} />
      <Divider spaceY={5} />
      <Divider spaceY={5} />

      <Flex
        sx={{
          height: '70vh',

          flexDirection: [`column`, `row`],
        }}
      >
        <Box
          sx={{
            pl: `3`,
            height: '100%',
            flexBasis: `1/4`,
            display: [`none`, `block`],
          }}
        >
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
            <Container>
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
                <Box sx={{ display: [`block`, `none`] }}>
                  <CustomTabSwitcher tabs={tabs} />
                </Box>
              </Card>
            </Container>
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
