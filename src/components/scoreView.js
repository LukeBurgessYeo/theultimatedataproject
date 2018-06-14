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
          homeOffense={homeOffense}
          homeHasDisc={homeHasDisc}
        />
        <Controls
          level={level}
          homeHasDisc={homeHasDisc}
          handleEvent={handleEvent}
          team1={team1}
          team2={team2}
          disableScore={disableScore}
          disableUndo={disableUndo}
          disableHalf={disableHalf}
          homePasses={homePasses}
          awayPasses={awayPasses}
          homeTurns={homeTurns}
          awayTurns={awayTurns}
        />
      </CardContent>
    </Card>
  )

export default ScoreView
