import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PointsTable from './points'

const StatsView = ({ points }) => (
  <Card style={{ marginTop: '1.45rem' }}>
    <CardContent>
      <PointsTable points={points} />
    </CardContent>
  </Card>
)

export default StatsView
