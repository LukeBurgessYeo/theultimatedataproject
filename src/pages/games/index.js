import React from 'react'
import { navigateTo } from 'gatsby-link'
import PageTransition from 'gatsby-plugin-page-transitions'
import SwipeableViews from 'react-swipeable-views'
import computePoints from '../../utils/computePoints'
import computeStats from '../../utils/computeStats'
import GameHeader from '../../components/gameHeader'
import SettingsView from '../../components/settingsView'
import ScoreView from '../../components/scoreView'
import PointsView from '../../components/pointsView'
import StatsView from '../../components/statsView'
import PrintableGame from '../../components/printableGame'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../../utils/withRoot'

const styles = {
  indicator: {
    backgroundColor: '#000000',
  },
}

class GamePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      title: '',
      team1: '',
      team2: '',
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
    if (this.state.value === 0 && this.props.size === 0) {
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

  transformIndex = index => (index === 2 ? 1 : index)

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

  handleEvent = trig => {
    console.log(trig)
    const newEvent = { trigger: trig, time: new Date() }
    const newEventsArray =
      newEvent.trigger === 'undo'
        ? this.state.events.slice(0, -1)
        : [...this.state.events, newEvent]
    this.setState(() => ({ events: newEventsArray }))
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
    const { transition, size, classes, data } = this.props
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
      />
    )

    const header = (
      <GameHeader
        toggleSettings={this.toggleSettings}
        value={value}
        handleTabChange={this.handleTabChange}
        showSettings={showSettings}
        mobile={size === 0}
        title={data.site.siteMetadata.title}
      />
    )

    const printable = (
      <PrintableGame
        title={title}
        team1={team1}
        team2={team2}
        homeScore={home.score}
        awayScore={away.score}
      >
        {pointsView}
        {statsView}
      </PrintableGame>
    )

    const page = size =>
      size === 0 ? (
        <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
          {scoreView}
          {pointsView}
          {statsView}
        </SwipeableViews>
      ) : size === 2 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div style={{ minWidth: '33.33333%' }}>{scoreView}</div>
          <div style={{ width: '33.33333%' }}>{pointsView}</div>
          <div style={{ width: '33.33333%' }}>{statsView}</div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div style={{ minWidth: '40%' }}>{scoreView}</div>
          <div style={{ width: '60%' }}>
            <Card style={{ margin: '4px 2px 2px 2px', paddingBottom: '0px' }}>
              <CardContent
                style={{
                  textAlign: 'center',
                  width: '100%',
                  margin: '0',
                  padding: '0px',
                }}
              >
                <Tabs
                  value={value}
                  fullWidth={true}
                  centered={true}
                  onChange={this.handleTabChange}
                  classes={{ indicator: classes.indicator }}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    color: '#000000',
                  }}
                >
                  <Tab label="Points" />
                  <Tab label="Stats" />
                </Tabs>
              </CardContent>
            </Card>
            <div>
              <SwipeableViews
                index={this.transformIndex(value)}
                onChangeIndex={this.handleChangeIndex}
              >
                {pointsView}
                {statsView}
              </SwipeableViews>
            </div>
          </div>
        </div>
      )

    return (
      <div>
        {header}
        <div
          style={{
            margin: '0 auto',
            padding: '0',
          }}
        >
          {settingsView}
          <div id={'game'}>
            <PageTransition>{page(size)}</PageTransition>
          </div>
        </div>
        <div id={'hiddenData'} style={{ display: 'none' }}>
          {printable}
        </div>
        <div id={'capture'} style={{ display: 'none' }} />
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(GamePage))
