import React from 'react';
import { Flex, Heading, Text } from 'theme-ui';
import { FaRegHandshake } from 'react-icons/fa';
import ContentButtons from '@solid-ui-components/ContentButtons';
import Divider from '@solid-ui-components/Divider';

const styles = {
  wrapper: {
    alignItems: `center`,
    flexDirection: `column`,
    bg: `omegaLighter`,
    borderRadius: `lg`,
    size: `full`,
    p: 4,
  },
  heading: {
    color: `omegaDark`,
    wordSpacing: 500, //force line breaks
    svg: {
      color: `beta`,
      size: `icon.lg`,
      display: `block`,
      mb: 3,
    },
  },
  subheading: {
    color: `omegaDark`,
    fontWeight: `normal`,
  },
  list: {
    color: `omegaDark`,
    listStyle: `none`,
    m: 0,
    p: 0,
    li: {
      p: 0,
      my: 2,
    },
    'li:before': {
      content: `""`,
      display: `inline-block`,
      width: `icon.xs`,
      bg: `success`,
      borderRadius: `full`,
      size: `7px`,
      mr: `7px`,
    },
  },
  button: {
    display: `block`,
    mt: `auto`,
  },
};

const BannerVertical = ({ content: { buttons } }) => (
  <Flex sx={styles.wrapper}>
    <Heading variant="h2" sx={styles.heading}>
      <FaRegHandshake />
      Best Networking Workshops
    </Heading>
    <Heading variant="h4" sx={styles.subheading}>
      In this workshop, learn when and how to network with modern best
      practices.
    </Heading>
    <Text as="ul" variant="small" sx={styles.list}>
      <li>Explain the importance of networking for career-building</li>
      <li>Practice modern tips for effective networking</li>
      <li>Understand the steps towards building your own network</li>
    </Text>
    {buttons && (
      <>
        <Divider space={2} />
        <ContentButtons content={buttons} />
      </>
    )}
  </Flex>
);

export default BannerVertical
