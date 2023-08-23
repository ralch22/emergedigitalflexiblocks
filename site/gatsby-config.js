module.exports = {
  plugins: [
    {
      resolve: '@elegantstack/gatsby-theme-flexiblocks',
      options: {
        createDemoPages: false,
        colorMode: true
      }
    },
    {
      resolve: `gatsby-plugin-fastify`,
      options: {
        /* discussed below */
      }, // All options are optional
    },
  ],
  // Customize your site metadata
  siteMetadata: {
    title: 'FlexiBlocks Theme',
    name: 'FlexiBlocks',
    description: 'My site description...'
  }
}
