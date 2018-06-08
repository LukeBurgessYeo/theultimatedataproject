import React from 'react'
import { navigateTo } from 'gatsby-link'
import compute from '../../utils/computeStats'
import Settings from '../../components/settings'
import Scoreboard from '../../components/scoreboard'
import Controls from '../../components/controls'
import PointsTable from '../../components/points'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      title: 'Game Title',
      team1: 'Team 1',
      team2: 'Team 2',
      level: 3,
      showSettings: false,
    }
  }

  componentDidMount = () => {
    const gameId = window.location.pathname.split('/')[2]
    const gameList = JSON.parse(localStorage.getItem('games'))
    if (!gameList) {
      console.log('Games list not found, creating and adding current game.')
      localStorage.setItem(
        'games',
        JSON.stringify([{ id: gameId, data: this.state }])
      )
    } else {
      const game = gameList.filter(g => g.id === gameId)[0]
      if (game) {
        console.log(`Loaded game: ${JSON.parse(game.data).title}.`)
        this.setState(JSON.parse(game.data))
      } else {
        console.log('Game not found in current list, adding new game.')
        gameList.push({ id: gameId, data: JSON.stringify(this.state) })
        localStorage.setItem('games', JSON.stringify(gameList))
      }
    }
  }

  componentDidUpdate = () => {
    let updated = JSON.parse(localStorage.getItem('games'))
    const game = updated.filter(
      g => g.id === window.location.pathname.split('/')[2]
    )[0]
    updated[updated.indexOf(game)].data = JSON.stringify(this.state)
    localStorage.setItem('games', JSON.stringify(updated))
  }

  handleChange = e => {
    e.target.type === 'text'
      ? this.setState({ [e.target.id]: e.target.value })
      : this.setState({ level: +e.target.value })
  }

  switchSides = () => {
    this.setState(p => ({
      team1: p.team2,
      team2: p.team1,
    }))
  }

  toggleSettings = () => {
    this.setState(p => ({ showSettings: !p.showSettings }))
  }

  handleEvent = e => {
    const newEvent = { trigger: e.target.id, time: new Date() }
    const newEventsArray =
      newEvent.trigger === 'undo'
        ? this.state.events.slice(0, -1)
        : [...this.state.events, newEvent]
    console.log(newEventsArray.map(item => item.trigger))
    this.setState(() => ({ events: newEventsArray }))
  }

  deleteGame = () => {
    if (
      window.confirm(
        'Are you sure you want to delete this game? This cannot be undone.'
      )
    ) {
      let updated = JSON.parse(localStorage.getItem('games'))
      const game = updated.filter(g => g.id === window.location.pathname)[0]
      updated.splice(updated.indexOf(game), 1)
      localStorage.setItem('games', JSON.stringify(updated))
      navigateTo('/')
    }
  }

  render() {
    const { points, home, away, homeHasDisc, homeOffense, firstHalf } = compute(
      this.state.events
    )

    const disableScore = this.state.level === 3
      && (this.state.events.length === 0
        || ['score', 'half'].includes(this.state.events.slice(-1).pop().trigger))

    const disableHalf = !firstHalf
      || points.length === 0
      || !['score', 'homeScore', 'awayScore'].includes(this.state.events.slice(-1).pop().trigger)

    const tempDisplay = (
      <div>
        <br />
        <br />
        <p>
          {homeOffense ? this.state.team1 : this.state.team2} is on offense this
          point.
        </p>
        <p>{homeHasDisc ? this.state.team1 : this.state.team2} has the disc.</p>
        <p>
          Passes: {home.passes}, {away.passes}
        </p>
        <p>
          Turns: {home.turns}, {away.turns}
        </p>
      </div>
    )

    return (
      <div>
        <Settings
          toggleSettings={this.toggleSettings}
          disabled={this.state.events.length > 0}
          display={this.state.showSettings ? 'block' : 'none'}
          title={this.state.title}
          handleChange={this.handleChange}
          team1={this.state.team1}
          team2={this.state.team2}
          switchSides={this.switchSides}
          level={this.state.level}
          deleteGame={this.deleteGame}
        />
        <hr />
        <Scoreboard
          title={this.state.title}
          team1={this.state.team1}
          team2={this.state.team2}
          homeScore={home.score}
          awayScore={away.score}
        />
        <Controls
          level={this.state.level}
          handleEvent={this.handleEvent}
          team1={this.state.team1}
          team2={this.state.team2}
          disableScore={disableScore}
          disableUndo={this.state.events.length === 0}
          disableHalf={disableHalf}
        />
        {tempDisplay}
        <PointsTable points={points} />
      </div>
    )
  }
}

export default IndexPage
