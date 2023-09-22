import React, { useEffect } from 'react';
import { Box, Flex, Text, css } from 'theme-ui';
import { navigate } from 'gatsby'
import { BiCheckCircle } from 'react-icons/bi'
import Reveal from '@solid-ui-components/Reveal/Reveal';

export default function success() {
  useEffect(() => {
    setTimeout(() => navigate("/"), 3000)
  }, [])
  return (
    <>
            
             <Flex sx={{ height: '100vh', width: 'full', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Reveal effect='fadeInDown'>
                    <BiCheckCircle size='64' color="#22c55e" />
                    <Text sx={{ mt: 4 }} variant="h4">You have successfully place an order. redirecting to hompage</Text>
                </Reveal>
             </Flex>
        
        </>
        
  );
};

