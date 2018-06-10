import React from 'react'
import uuidv1 from 'uuid/v1'
import Header from '../components/header'
import GameCard from '../components/gamecard'

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
        <Header siteTitle="Stats Tracker" />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          <div style={transition && transition.style}>
            <GameCard game={`/games/${this.state.newId}`} />
            <div>
              {this.state.games.length > 0 &&
                this.state.games
                  .reverse()
                  .map(game => <GameCard key={game.id} game={game} />)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
