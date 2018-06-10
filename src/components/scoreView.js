import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Scoreboard from './scoreboard'
import Controls from './controls'

const ScoreView = ({
  title,
  team1,
  team2,
  homeScore,
  awayScore,
  level,
  handleEvent,
  disableScore,
  disableUndo,
  disableHalf,
  homeOffense,
  homeHasDisc,
  homePasses,
  awayPasses,
  homeTurns,
  awayTurns,
}) => (
  <Card style={{ marginTop: '1.45rem' }}>
    <CardContent style={{ textAlign: 'center' }}>
      <Scoreboard
        title={title}
        team1={team1}
        team2={team2}
        homeScore={homeScore}
        awayScore={awayScore}
      />
      <Controls
        level={level}
        handleEvent={handleEvent}
        team1={team1}
        team2={team2}
        disableScore={disableScore}
        disableUndo={disableUndo}
        disableHalf={disableHalf}
      />
      <div>
        <br />
        <br />
        <p>{homeOffense ? team1 : team2} is on offense this point.</p>
        <p>{homeHasDisc ? team1 : team2} has the disc.</p>
        <p>
          Passes: {homePasses}, {awayPasses}
        </p>
        <p>
          Turns: {homeTurns}, {awayTurns}
        </p>
      </div>
    </CardContent>
  </Card>
)

export default ScoreView
