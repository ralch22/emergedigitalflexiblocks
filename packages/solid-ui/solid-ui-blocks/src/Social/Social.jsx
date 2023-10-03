import React from 'react';
import { Card, Text } from 'theme-ui';
import Section from '@solid-ui-components/Section';
import Navigation from '@solid-ui-components/Navigation';
import useSiteMetadata from '@blocks-helpers/useSiteMetadata';
import attachSocialIcons from '@helpers/attachSocialIcons';

const Social = () => {
  const { social } = useSiteMetadata();

  return (
    <Section aside title="Let's Talk">
      <Card variant="paper">
        <Text variant="p">
          Want to find out how I can solve problems specific to your business?
          Let's talk.
        </Text>
        <Navigation items={attachSocialIcons(social)} iconOnly />
      </Card>
    </Section>
  );
};

export default Social;
