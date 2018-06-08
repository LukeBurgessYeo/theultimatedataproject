import React from 'react'

const Scoreboard = ({ title, team1, team2, homeScore, awayScore }) => (
  <div>
    <h3>{title}</h3>
    <h4>
      {team1} vs {team2}
    </h4>
    <h4>
      {homeScore} - {awayScore}
    </h4>
  </div>
)

export default Scoreboard
