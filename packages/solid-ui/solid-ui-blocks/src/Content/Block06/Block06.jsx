import React from 'react';
import { Box, Card, Container, Grid } from 'theme-ui';
import Divider from '@solid-ui-components/Divider';
import ContentText from '@solid-ui-components/ContentText';
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent';

const ServiceColumn = ({ text }) => {
  return (
    <Box sx={{ width: '100%', px: [2, 3] }}>
      <Card
        sx={{
          width: '100%',
          p: 4,
          mb: 4,
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ContentText flex content={text} />
      </Card>
    </Box>
  );
};

const ContentBlock01 = ({ content: { text, collection, buttons } }) => {
  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          justifyContent: `center`,
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <ContentText sx={{ textAligin: 'center' }} center content={text} />
      </Box>
      <Divider />
      <Grid columns={[1, 2]} gap={2}>
        {collection &&
          collection.map(({ text }, index) => {
            return <ServiceColumn text={text} />;
          })}
      </Grid>
    </Container>
  );
};

export default WithDefaultContent(ContentBlock01);
