import React from 'react'
import Link from 'gatsby-link'
import AppBar from '@material-ui/core/AppBar'
import Home from '@material-ui/icons/Home'
import Settings from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
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
  width: '15%',
  color: '#FFFFFF',
  borderRadius: '0',
}

const settingsStyle = {
  width: '15%',
  color: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '0',
}

const GameHeader = ({
  classes,
  toggleSettings,
  value,
  handleTabChange,
  showSettings,
  mobile,
  title,
}) => (
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
      {mobile ? (
        <Tabs
          value={value}
          fullWidth={true}
          centered={true}
          classes={{ indicator: classes.indicator }}
          onChange={handleTabChange}
          style={{ width: '100%' }}
        >
          <Tab label="Score" />
          <Tab label="Points" />
          <Tab label="Stats" />
        </Tabs>
      ) : (
        <div style={{ width: '100%', textAlign: 'center', padding: '10px 0' }}>
          <Typography variant="title" color="inherit" style={{ flex: '1' }}>
            {title}
          </Typography>
        </div>
      )}
      <IconButton
        onClick={toggleSettings}
        style={showSettings ? buttonStyle : settingsStyle}
      >
        <Settings />
      </IconButton>
    </div>
  </AppBar>
)

export default withRoot(withStyles(styles)(GameHeader))
