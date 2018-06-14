import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PointsTable from './pointsTable'

const StatsView = ({ points, level }) => (
  <Card style={{ marginTop: '1.45rem' }}>
    <CardContent>
      <PointsTable points={points} level={level} />
    </CardContent>
  </Card>
)

export default StatsView
