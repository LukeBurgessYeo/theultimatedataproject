import React from 'react'
import uuidv1 from 'uuid/v1'
import Link from 'gatsby-link'
import PageTransition from 'gatsby-plugin-page-transitions'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Info from '@material-ui/icons/Info'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import GameCard from '../components/gamecard'
import InfoModal from '../components/infoModal'
import withRoot from '../utils/withRoot'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      newId: uuidv1().split('-')[0],
      open: false,
    }
  }

  componentDidMount = () => {
    const games = localStorage.getItem('games')
      ? JSON.parse(localStorage.getItem('games'))
      : false
    if (games && games.length > 0) {
      let id = uuidv1().split('-')[0]
      while (games.filter(game => game.id === id).length > 0) {
        id = uuidv1().split('-')[0]
      }
      this.setState({ games: games, newId: id })
    } else {
      localStorage.setItem('games', JSON.stringify(this.state.games))
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { transition, data } = this.props

    return (
      <div>
        <AppBar
          position="static"
          style={{
            marginBottom: '1.45rem',
          }}
        >
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: '1' }}>
              {data.site.siteMetadata.title}
            </Typography>
            <IconButton onClick={this.handleOpen} style={{ color: '#FFFFFF' }}>
              <Info />
            </IconButton>
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
          <PageTransition>
            <Button
              variant="fab"
              color="primary"
              component={Link}
              to={`/games/${this.state.newId}`}
              style={{ position: 'absolute', bottom: '30px', right: '30px' }}
            >
              <AddIcon />
            </Button>
            <div>
              {this.state.games.length > 0 ? (
                [...this.state.games]
                  .reverse()
                  .map(game => <GameCard key={game.id} game={game} />)
              ) : (
                <div>
                  <Typography variant="display1">
                    Welcome to {data.site.siteMetadata.title}
                  </Typography>
                  <Typography variant="subheading">
                    A simple application for keeping track of stats during a
                    game of ultimate.
                  </Typography>
                  <br />
                  <Typography variant="title">
                    Click the + to add a new game
                  </Typography>
                </div>
              )}
            </div>
            <InfoModal
              open={this.state.open}
              close={this.handleClose}
              title={data.site.siteMetadata.title}
            />
          </PageTransition>
        </div>
      </div>
    )
  }
}

export default withRoot(HomePage)
