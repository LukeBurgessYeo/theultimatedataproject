module.exports = {
  siteMetadata: {
    title: 'The Ultimate Data Project',
  },
  plugins: [
    `gatsby-plugin-react-next`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/games/*`] },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Ultimate Data Project",
        short_name: "Ultimate Data",
        start_url: "/",
        background_color: "#3f51b5",
        theme_color: "#FFFFFF",
        display: "standalone",
        icons: [
          {
            src: "/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },]
      }
    },
    `gatsby-plugin-offline`,
    'gatsby-plugin-react-helmet',
  ],
}
