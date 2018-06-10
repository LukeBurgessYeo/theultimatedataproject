import React from 'react'
import Link from 'gatsby-link'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'

const styles = newgame => ({
  margin: '15px 0',
  borderLeft: newgame ? '5px solid #3f51b5' : '5px solid #757de8',
  borderRadius: '5px 0 0 5px',
})

const GameCard = ({ game }) => {
  if (game.id) {
    const data = JSON.parse(game.data)
    return (
      <Link to={`/games/${game.id}`}>
        <Card style={styles(true)}>
          <CardContent>
            <Typography variant="headline">
              {data.team1}
              {' vs '}
              {data.team2}
            </Typography>
            <Typography variant="subheading">{data.title}</Typography>
          </CardContent>
        </Card>
      </Link>
    )
  } else {
    return (
      <Link to={game}>
        <Card style={styles(false)}>
          <CardContent style={{ paddingBottom: '16px' }}>
            <Typography variant="button">
              <AddCircleOutline style={{ verticalAlign: '-32%' }} />{' '}
              <strong>Create new game</strong>
            </Typography>
          </CardContent>
        </Card>
      </Link>
    )
  }
}

export default GameCard
