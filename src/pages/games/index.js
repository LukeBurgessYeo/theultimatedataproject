import React from 'react'
import { navigateTo } from 'gatsby-link'
import SwipeableViews from 'react-swipeable-views'
import compute from '../../utils/computeStats'
import Results from '../../utils/computeResults'
import GameHeader from '../../components/gameHeader'
import SettingsView from '../../components/settingsView'
import ScoreView from '../../components/scoreView'
import StatsView from '../../components/statsView'
import withRoot from '../../utils/withRoot'

class GamePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      title: 'Game Title',
      team1: 'Team 1',
      team2: 'Team 2',
      level: 3,
      showSettings: false,
      value: 0,
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
    if (updated) {
      const game = updated.filter(
        g => g.id === window.location.pathname.split('/')[2]
      )[0]
      if (game) {
        updated[updated.indexOf(game)].data = JSON.stringify(this.state)
        localStorage.setItem('games', JSON.stringify(updated))
      }
    }
  }

  handleTabChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
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
    let updated = JSON.parse(localStorage.getItem('games'))
    const game = updated.filter(
      g => g.id === window.location.pathname.split('/')[2]
    )[0]
    updated.splice(updated.indexOf(game), 1)
    localStorage.setItem('games', JSON.stringify(updated))
    navigateTo('/')
  }

  render() {
    const {
      events,
      level,
      team1,
      team2,
      title,
      value,
      showSettings,
    } = this.state
    const { transition } = this.props
    const { points, home, away, homeHasDisc, homeOffense, firstHalf } = compute(
      events
    )
    const results = Results(points)

    const disableScore =
      level === 3 &&
      (events.length === 0 ||
        ['score', 'half'].includes(events.slice(-1).pop().trigger))

    const disableHalf =
      !firstHalf ||
      points.length === 0 ||
      !['score', 'homeScore', 'awayScore'].includes(
        events.slice(-1).pop().trigger
      )

    const scoreView = (
      <ScoreView
        title={title}
        team1={team1}
        team2={team2}
        homeScore={home.score}
        awayScore={away.score}
        level={level}
        handleEvent={this.handleEvent}
        disableScore={disableScore}
        disableUndo={events.length === 0}
        disableHalf={disableHalf}
        homeOffense={homeOffense}
        homeHasDisc={homeHasDisc}
        homePasses={home.passes}
        awayPasses={away.passes}
        homeTurns={home.turns}
        awayTurns={away.turns}
      />
    )

    const stats = (
      <StatsView
        points={points}
        level={level}
        team1={team1}
        team2={team2}
        results={results}
      />)

    const settingsView = (
      <SettingsView
        display={showSettings}
        disabled={events.length > 0}
        title={title}
        handleChange={this.handleChange}
        team1={team1}
        team2={team2}
        switchSides={this.switchSides}
        level={level}
        deleteGame={this.deleteGame}
      />
    )

    const header = (
      <GameHeader
        disabled={events.length > 0}
        toggleSettings={this.toggleSettings}
        title={title}
        handleChange={this.handleChange}
        team1={team1}
        team2={team2}
        switchSides={this.switchSides}
        level={level}
        deleteGame={this.deleteGame}
        value={value}
        handleTabChange={this.handleTabChange}
      />
    )

    return (
      <div>
        {header}
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0',
          }}
        >
          {settingsView}
          <div style={transition && transition.style}>
            <SwipeableViews
              index={value}
              onChangeIndex={this.handleChangeIndex}
            >
              {scoreView}
              {stats}
            </SwipeableViews>
          </div>
        </div>
      </div>
    )
  }
}

export default withRoot(GamePage)
