import React from 'react'
import Typography from '@material-ui/core/Typography'

const Scoreboard = ({ title, team1, team2, homeScore, awayScore }) => (
  <div>
    <Typography variant="subheading">{title}</Typography>
    <Typography variant="title">
      {team1} vs {team2}
    </Typography>
    <Typography>
      {homeScore} - {awayScore}
    </Typography>
  </div>
)

export default Scoreboard
