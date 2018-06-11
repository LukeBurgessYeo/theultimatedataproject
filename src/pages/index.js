import React from 'react'
import uuidv1 from 'uuid/v1'
import Link from 'gatsby-link'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import GameCard from '../components/gamecard'
import withRoot from '../utils/withRoot'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      newId: uuidv1().split('-')[0],
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

  render() {
    const { transition } = this.props

    return (
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
          <div style={transition && transition.style}>
            <Link to={`/games/${this.state.newId}`}>
              <Card style={{
                margin: '15px 0',
                borderLeft: '5px solid #757de8',
                borderRadius: '5px 0 0 5px',
              }}>
                <CardContent style={{ paddingBottom: '16px' }}>
                  <Typography variant="button">
                    <strong>Create new game</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Link>
            <div>
              {this.state.games.length > 0 &&
                [...this.state.games]
                  .reverse()
                  .map(game => <GameCard key={game.id} game={game} />)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRoot(HomePage)
