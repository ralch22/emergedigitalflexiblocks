import React from 'react';
import { Container } from 'theme-ui';

export default function Main({ children, ...props }) {
  return (
    <Container variant="main" {...props}>
      {children}
    </Container>
  );
}
