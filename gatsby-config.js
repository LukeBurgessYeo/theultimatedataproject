module.exports = {
  siteMetadata: {
    title: 'Stats Tracker',
  },
  plugins: ['gatsby-plugin-react-helmet', `gatsby-plugin-react-next`, {
    resolve: `gatsby-plugin-create-client-paths`,
    options: { prefixes: [`/games/*`] },
  },],
}
