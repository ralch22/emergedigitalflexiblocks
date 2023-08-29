import React, { useState, useEffect } from 'react';
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import Header from '@solid-ui-blocks/Header/Block01'
import Content from '@solid-ui-blocks/Content/Block02'
import SingleCase from '@solid-ui-blocks/SinglePost/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'


function SinglePost(props) {

//   if (!post) {
//     return <div>Loading...</div>;
//   }

  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Header />
      <Divider space='5' />
      <Container variant='wide'>
        <Content />
      </Container>
      <Divider space='5' />
      <Container>
        <SingleCase post={props.pageContext.post} />
       </Container>
      <Divider space='5' />
      <Footer  />
    </Layout>
  )
}


export default SinglePost
