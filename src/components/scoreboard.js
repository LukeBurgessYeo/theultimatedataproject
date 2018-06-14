import React from 'react'
import Typography from '@material-ui/core/Typography'

const Scoreboard = ({
  title,
  team1,
  team2,
  homeScore,
  awayScore,
  homeOffense,
  homeHasDisc,
}) => (
  <div>
    <Typography variant="subheading" style={{ margin: '10px 0 15px 0' }}>
      {title}
    </Typography>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Typography>{homeOffense ? 'offense' : 'defense'}</Typography>{' '}
      <Typography>{homeOffense ? 'defense' : 'offense'}</Typography>
    </div>
    <div
      variant="title"
      style={{ display: 'flex', justifyContent: 'space-evenly' }}
    >
      <Typography
        variant="title"
        style={{
          maxWidth: '40%',
          borderBottom: homeHasDisc ? '2px solid black' : 'none',
        }}
      >
        {team1}
      </Typography>
      <Typography variant="title">
        {homeScore} - {awayScore}
      </Typography>
      <Typography
        variant="title"
        style={{
          maxWidth: '40%',
          borderBottom: !homeHasDisc ? '2px solid black' : 'none',
        }}
      >
        {team2}
      </Typography>
    </div>
  </div>
)

export default Scoreboard
