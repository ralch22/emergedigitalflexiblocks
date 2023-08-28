import React, { useState, useEffect } from 'react';
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import Header from '@solid-ui-blocks/Header/Block01'
import Content from '@solid-ui-blocks/Content/Block02'
import SingleCase from '@solid-ui-blocks/SinglePost/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import styles from '../pages/cases/_styles';

function SinglePost({ postId }) {
  const [post, setPost] = useState(null);
  const [featuredMediaUrl, setFeaturedMediaUrl] = useState(null);

  useEffect(() => {
    // Fetch single custom post from WordPress REST API
    fetch(`https://emergedigital.ae/wp-json/wp/v2/case-studies/${postId}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
        getFeaturedMediaUrl(data.featured_media);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  async function getFeaturedMediaUrl(featuredMediaId) {
    if (!featuredMediaId) {
      return;
    }

    try {
      const response = await fetch(`https://emergedigital.ae/wp-json/wp/v2/media/${featuredMediaId}`);
      const featuredMediaData = await response.json();
      setFeaturedMediaUrl(featuredMediaData.source_url);
    } catch (error) {
      console.error('Error fetching featured media:', error);
    }
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Header content={content['header']} />
      <Divider space='5' />
      <Container variant='wide' sx={styles.heroContainer}>
        <Content content={content['hero']} />
      </Container>
      <Divider space='5' />
      <Container>
        <SingleCase media={getFeaturedMediaUrl} post={post} />
       </Container>
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}


export default SinglePost
