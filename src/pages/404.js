import React from 'react'
import Link from 'gatsby-link'

const NotFoundPage = () => (
  <div style={{ margin: '20px' }}>
    Looks like this page doesn't exist. Click{' '}
    <Link to={'/'} style={{ textDecoration: 'underline' }}>
      here
    </Link>{' '}
    to go back to the home page.
  </div>
)

export default NotFoundPage
