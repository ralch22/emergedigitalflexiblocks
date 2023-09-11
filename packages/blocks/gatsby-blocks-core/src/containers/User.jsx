import React from 'react';
import { useQuery } from 'urql';
import Layout from '@solid-ui-layout/Layout'
import Stack from '@solid-ui-layout/Stack/Stack'
import Main from '@solid-ui-layout/Main/Main'
import Footer from '@solid-ui-blocks/Footer/Block01';
import Seo from '@solid-ui-blocks/Seo'
import Header from '@solid-ui-blocks/Header/Block01';
import { Box, Flex, Link, Text, Heading } from 'theme-ui';
import Divider from '@solid-ui-components/Divider'
import { gql } from 'urql';
import { isUserLoggedIn } from '../../../../solid-ui/solid-ui-components/src/utils/functions'
import { normalizeBlockContentNodes } from '@blocks-helpers';

const auth = typeof window !== 'undefined' ? localStorage.getItem("auth") : null
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

export default function DashboardPage({ data: { allBlockContent }, ...props }) {
  // Fetch the user's information
  console.log("auth", parsedData)
//   const [userResult] = useQuery({
//     query: USER_QUERY,
//     variables: { userId: parsedData.user.id }
//   });
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
//   const { data: userData } = userResult;

  return (
    <Layout {...props}>
        <Header search content={content['header']} />
        <Divider spaceY={5} />
        <Divider spaceY={5} />
    
        <Stack effectProps={{ fraction: 0 }}>
        <Box sx={{ pl: `3`, flexBasis: `1/4` }}>
        <Box
                sx={{
                width: '200px',
                p: 3,
                borderRight: '1px solid #ccc',
                }}
            >
                <Heading as="h2">Dashboard</Heading>
                <Text>
                <Link to="/dashboard/profile">Profile</Link>
                </Text>
                <Text>
                <Link to="/dashboard/orders">Orders</Link>
                </Text>
            </Box>
            
        </Box>
        <Main>
        <Flex>
            {/* Sidebar */}
            

            {/* Main Content */}
            <Box sx={{ flex: 1, p: 3 }}>
                
                {parsedData ? (
                <Box>
                    {auth && <Text as="medium"> Hello <strong>{parsedData.user.name}</strong> (not <strong>{parsedData.user.name}</strong>? Log out) From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details</Text>}
                </Box>
                ) : (
                <Text>Loading user data...</Text>
                )}
                {/* Add dashboard content here */}
            </Box>
            </Flex>
        </Main>
        
        </Stack>
        <Divider />
        <Footer content={content['footer']} />
        </Layout>
        
  );
};

