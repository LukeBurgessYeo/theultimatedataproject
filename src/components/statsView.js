import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PointsTable from './pointsTable'

const StatsView = ({ points, level, team1, team2 }) => (
  <Card style={{ margin: '1.45rem 2px' }}>
    <CardContent>
      <PointsTable
        points={points}
        level={level}
        team1={team1}
        team2={team2}
      />
    </CardContent>
  </Card>
)

export default StatsView
