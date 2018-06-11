import React from 'react'
import Link from 'gatsby-link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const NotFoundPage = () => (
  <div>
    <AppBar
      position="static"
      style={{
        marginBottom: '1.45rem',
      }}
    >
      <Toolbar>
        <Typography variant="title" color="inherit">
          Stats Tracker
        </Typography>
      </Toolbar>
    </AppBar>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      <Card>
        <CardContent>
          <Typography>
            If the page you're trying to reach doesn't load in the next few seconds, click <Link to={'/'}><strong>here</strong></Link> to go back to the home page.
        </Typography>
        </CardContent>
      </Card>
    </div>
  </div>
)

export default NotFoundPage
