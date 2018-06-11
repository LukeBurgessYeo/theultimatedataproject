import React from 'react'
import Link from 'gatsby-link'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const styles = {
  margin: '15px 0',
  borderLeft: '5px solid #3f51b5',
  borderRadius: '5px 0 0 5px',
}

const GameCard = ({ game }) => {
  const { team1, team2, title } = JSON.parse(game.data)
  return (
    <Link to={`/games/${game.id}`}>
      <Card style={styles}>
        <CardContent>
          <Typography variant="headline">
            {team1}
            {' vs '}
            {team2}
          </Typography>
          <Typography variant="subheading">{title}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default GameCard
