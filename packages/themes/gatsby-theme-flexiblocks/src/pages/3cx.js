import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import { Container } from 'theme-ui';
import Layout from '@solid-ui-layout/Layout';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import Divider from '@solid-ui-components/Divider';
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01';
import ModalSimple from '@solid-ui-blocks/Modal/Block02';
import ModalCart from '@solid-ui-blocks/Modal/Block03';
import Header from '@solid-ui-blocks/Header/Block01';
import SingleText from '@solid-ui-blocks/Content/Block07';
import Content from '@solid-ui-blocks/Features/Block05';
import Chat from '@solid-ui-blocks/Features/Block04';
import Contact from '@solid-ui-blocks/CallToAction/Block02';
import Pricing from '@solid-ui-blocks/Pricing/Block01';
import Faq from '@solid-ui-blocks/Faq/Block01';
import Footer from '@solid-ui-blocks/Footer/Block01';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/ducks/productSlice';
import Products from '@solid-ui-blocks/Products/Block01';
import styles from './_styles';

const auth =
  typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
const parsedData = JSON.parse(auth);

const AppDevelopment = props => {
  const { allBlockContent, allWpPage } = props.data;
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.allProducts);
  const filteredProducts = useSelector(
    state => state.products.filteredProducts,
  );
  const regularId = 57; // Replace with the category ID you want to filter by
  const feeId = 69;
  const aspid = 70;

  useEffect(() => {
    dispatch(fetchProducts({ token: parsedData && parsedData.authToken })); // Fetch products from WooCommerce when the component mounts
    // dispatch(filterByCategory(categoryId));
  }, [dispatch]);

  const filtered = products.filter(product => {
    const firstCategory = product.categories[0]; // Assuming the first category is the one you want
    return firstCategory.id === regularId;
  });

  const filtered2 = products.filter(product => {
    const firstCategory = product.categories[0]; // Assuming the first category is the one you want
    return firstCategory.id === feeId;
  });

  const filtered2WithSubscription = filtered2.map(product => ({
    ...product,
    subscription: true,
    plan: 'Yearly',
  }));

  const filtered3 = products.filter(product => {
    const firstCategory = product.categories[0]; // Assuming the first category is the one you want
    return firstCategory.id === aspid;
  });

  const downloadables = products.filter(product => {
    return product.downloadable === true;
  });

  const uri = props.path;
  const filter = allWpPage.nodes.filter(page => {
    return page.uri === uri;
  });
  const post = filter[0];

  return (
    <Layout {...props}>
      <Seo post={post} />
      {/* Modals */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      <ModalCart content={content['cart']} />
      {/* Blocks */}
      <Header content={content['header']} />
      <Divider space="5" />
      <Container variant="wide" sx={styles.heroContainer3CX}>
        <SingleText content={content['hero']} />
      </Container>
      <img
        src="https://emergedigital.ae/wp-content/uploads/2022/06/3CX.jpg"
        class="attachment-full size-full wp-image-2944 entered lazyloaded"
        alt=""
      />
      <Divider space="5" />
      <SingleText content={content['feature-one']} />
      <Divider space="5" />
      <Container>
        <Faq content={content['faq']} />
      </Container>
      <Divider space="5" />
      <Content content={content['benefit']} />
      <Divider space="5" />
      <Content col2 content={content['target']} />
      <Divider space="5" />
      <Chat col2 content={content['chat']} />
      <Divider space="5" />
      <Products products={filtered} content={content['products_1']} />
      <Divider space="5" />
      <Products
        subscription
        products={filtered2WithSubscription}
        content={content['products_2']}
      />
      <Divider space="5" />
      <Products
        subscription
        products={filtered3}
        content={content['products_3']}
      />
      <Divider space="5" />
      <Pricing content={content['pricing']} />
      <Divider space="5" />
      <Contact content={content['cta']} />
      <Divider space="5" />
      <Footer content={content['footer']} />
    </Layout>
  );
};

export const query = graphql`
  query innerpageAppDevelopmentBlockContent {
    allBlockContent(filter: { page: { in: ["innerpage/3cx", "shared"] } }) {
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

export default AppDevelopment;
