import React, { useEffect } from 'react';
import Layout from '@solid-ui-layout/Layout'
import Stack from '@solid-ui-layout/Stack/Stack'
import Main from '@solid-ui-layout/Main/Main'
import Footer from '@solid-ui-blocks/Footer/Block01';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/orderSlice'; 
import Header from '@solid-ui-blocks/Header/Block01';
import { Box, Flex, Link, Text, Heading } from 'theme-ui';
import Divider from '@solid-ui-components/Divider'
import { navigate } from 'gatsby'
import { normalizeBlockContentNodes } from '@blocks-helpers';
import { handleLogout } from '../../../../themes/gatsby-theme-flexiblocks/src/utils/functions'
import Card from '@solid-ui-components/Card/Card';

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
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);

  useEffect(() => {
    dispatch(fetchOrders());
    // Dispatch actions for other entities here
  }, [dispatch]);
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
                <Box onClick={handleLogout}>Logout</Box>
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
                    <Card>
                    {auth && <Text as="medium"> Hello <strong>{parsedData.user.name}</strong> (not <strong>{parsedData.user.name}</strong>? Log out) From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details</Text>}
                    </Card>
                    <div>
                        {orders.map((order) => (
                            <div key={order.id}>{order.title}</div>
                        ))}
                        {/* Render other entity data */}
                    </div>
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

