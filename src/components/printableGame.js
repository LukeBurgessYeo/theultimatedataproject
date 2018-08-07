import React from 'react'
import Typography from '@material-ui/core/Typography'

const PrintableGame = ({
  title,
  team1,
  team2,
  homeScore,
  awayScore,
  children,
}) => (
  <div id={'savedGameData'} style={{ maxWidth: '400px' }}>
    <Typography
      variant="subheading"
      style={{ padding: '30px 0 15px 0', textAlign: 'center' }}
    >
      {title}
    </Typography>
    <div
      variant="title"
      style={{ display: 'flex', justifyContent: 'space-evenly' }}
    >
      <Typography
        variant="title"
        style={{
          maxWidth: '40%',
        }}
      >
        {team1}
      </Typography>
      <Typography variant="title" style={{ whiteSpace: 'nowrap' }}>
        {homeScore} - {awayScore}
      </Typography>
      <Typography
        variant="title"
        style={{
          maxWidth: '40%',
        }}
      >
        {team2}
      </Typography>
    </div>
    {children}
    <Typography
      variant="caption"
      style={{
        textAlign: 'right',
        padding: '0 10px 5px 0',
        marginTop: '-20px',
      }}
    >
      theultimatedataproject.com
    </Typography>
  </div>
)

export default PrintableGame
