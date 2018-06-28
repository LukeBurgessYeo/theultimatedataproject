import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ResultsTable from './resultsTable'

const ResultsView = ({ level, team1, team2, results }) => (
  <div style={{ margin: '4px 2px' }}>
    <Card style={{ marginTop: '4px' }}>
      <CardContent style={{ padding: '4px' }}>
        <ResultsTable
          team1={team1}
          team2={team2}
          level={level}
          results={results}
        />
      </CardContent>
    </Card>
  </div>
)

export default ResultsView
