import React from 'react';
import { Container } from 'theme-ui';

export default function Sidebar({ children, ...props }) {
  <Container variant="sidebar" {...props}>
    {children}
  </Container>;
}
