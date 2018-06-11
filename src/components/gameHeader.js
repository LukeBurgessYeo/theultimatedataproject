import React from 'react'
import Link from 'gatsby-link'
import AppBar from '@material-ui/core/AppBar'
import Home from '@material-ui/icons/Home'
import Settings from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../utils/withRoot'

const styles = {
  indicator: {
    backgroundColor: '#FFFFFF',
  },
  flexContainer: {
    display: 'inline',
    float: 'right',
  },
}

const buttonStyle = {
  width: '20%',
  color: '#FFFFFF',
  borderRadius: '0',
}

const GameHeader = ({ classes, toggleSettings, value, handleTabChange }) => (
  <div>
    <AppBar position="static">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <IconButton component={Link} to={'/'} style={buttonStyle}>
          <Home />
        </IconButton>
        <Tabs
          value={value}
          fullWidth={true}
          classes={{ indicator: classes.indicator }}
          onChange={handleTabChange}
          style={{ width: '100%' }}
        >
          <Tab label="Score" />
          <Tab label="Stats" />
        </Tabs>
        <IconButton onClick={toggleSettings} style={buttonStyle}>
          <Settings />
        </IconButton>
      </div>
    </AppBar>
  </div>
)

export default withRoot(withStyles(styles)(GameHeader))
