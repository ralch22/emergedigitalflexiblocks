import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@theme-ui/mdx'
import components from '@solid-ui-components/Mdx'

export const PostBody = ({ body }) => {
  return (
    <MDXProvider components={components}>
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  )
}
