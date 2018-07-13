import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './index.css'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 0,
    }
  }

  componentDidMount = () => {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.checkMobile)
  }

  checkMobile = () => {
    const size = window.innerWidth < 700 ? 0 : window.innerWidth < 1100 ? 1 : 2
    this.setState({ size: size })
  }

  render() {
    const { children, data } = this.props
    return (
      <div style={{ backgroundColor: '#EAEAEA' }}>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content:
                'An application for keeping track of stats during a game of ultiamte.',
            },
            { name: 'keywords', content: 'ultimate, stats, data' },
          ]}
        />
        {children({ ...this.props, size: this.state.size })}
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
