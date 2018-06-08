import React from 'react'
import Link from 'gatsby-link'
import uuidv1 from 'uuid/v1'

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      newId: uuidv1().split('-')[0],
    }
  }

  componentDidMount = () => {
    const games = JSON.parse(localStorage.getItem('games'))
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
    return (
      <div>
        <h1>Basic Ulti Stats</h1>
        <p>Welcome to the home page</p>
        <Link to={`/games/${this.state.newId}`}>
          Click here to create a new game
        </Link>
        <ul>
          {this.state.games.length > 0 &&
            this.state.games.map(game => (
              <li key={game.id}>
                Title: {JSON.parse(game.data).title},{' '}
                <Link to={`/games/${game.id}`}>view</Link>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}
