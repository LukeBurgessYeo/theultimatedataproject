module.exports = {
  siteMetadata: {
    title: 'Stats Tracker',
  },
  plugins: ['gatsby-plugin-react-helmet', {
    resolve: `gatsby-plugin-create-client-paths`,
    options: { prefixes: [`/games/*`] },
  },],
}
