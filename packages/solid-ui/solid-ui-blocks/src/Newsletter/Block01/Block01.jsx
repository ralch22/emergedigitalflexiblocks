import React from 'react';
import { Container, Flex, ListItem } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import ContentForm from '@solid-ui-components/ContentForm';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const Newsletter = ({ content: { collection, form } }) => (
  <Container sx={{ textAlign: `center` }}>
    <Reveal effect="fadeInUp">
      {collection && (
        <>
          <Divider />
          <Flex sx={{ flexWrap: `wrap`, m: -3 }}>
            {collection?.map((props, index) => (
              <Reveal
                key={`item-${index}`}
                effect="fadeInGrow"
                delay={0.15 * (index + 1)}
              >
                <ListItem {...props} iconProps={{ size: 'md' }} center />
              </Reveal>
            ))}

            {form && (
              <ContentForm form={form} id={`form.${form.fields.identifier}`} />
            )}
          </Flex>
        </>
      )}
    </Reveal>
  </Container>
);

export default WithDefaultContent(Newsletter);
