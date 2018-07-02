import React from 'react'
import { navigateTo } from 'gatsby-link'
import SwipeableViews from 'react-swipeable-views'
import computePoints from '../../utils/computePoints'
import computeStats from '../../utils/computeStats'
import GameHeader from '../../components/gameHeader'
import SettingsView from '../../components/settingsView'
import ScoreView from '../../components/scoreView'
import PointsView from '../../components/pointsView'
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
      localStorage.setItem(
        'games',
        JSON.stringify([{ id: gameId, data: this.state }])
      )
    } else {
      const game = gameList.filter(g => g.id === gameId)[0]
      if (game) {
        this.setState(JSON.parse(game.data))
      } else {
        this.setState({ showSettings: true })
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
    if (this.state.value === 0) {
      window.scrollTo(0, 0)
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = 'auto'
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
    const {
      points,
      home,
      away,
      homeHasDisc,
      homeOffense,
      firstHalf,
    } = computePoints(events)
    const computedStats = computeStats(points)

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

    const pointsView = (
      <PointsView
        points={points}
        level={level}
        team1={team1}
        team2={team2}
        results={computedStats}
      />
    )

    const statsView = (
      <StatsView
        level={level}
        team1={team1}
        team2={team2}
        results={computedStats}
      />
    )

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
        toggleSettings={this.toggleSettings}
        value={value}
        handleTabChange={this.handleTabChange}
        showSettings={showSettings}
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
              {pointsView}
              {statsView}
            </SwipeableViews>
          </div>
        </div>
      </div>
    )
  }
}

export default withRoot(GamePage)
