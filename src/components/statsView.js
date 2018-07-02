import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const StatsView = ({ level, team1, team2, results }) => (
  <div style={{ margin: '4px 2px' }}>
    <Card style={{ marginTop: '4px' }}>
      <CardContent style={{ padding: '4px' }}>
        <Table style={{ tableLayout: 'fixed', maxWidth: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ textAlign: 'center' }}
                padding="none"
                colSpan={2}
              >
                {team1}
              </TableCell>
              <TableCell
                padding="none"
                style={{ width: '35%', textAlign: 'center' }}
              />
              <TableCell
                style={{ textAlign: 'center' }}
                padding="none"
                colSpan={2}
              >
                {team2}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ textAlign: 'center', wordWrap: 'normal' }}
                padding="none"
              >
                Offense
              </TableCell>
              <TableCell
                style={{ textAlign: 'center', wordWrap: 'normal' }}
                padding="none"
              >
                Defense
              </TableCell>
              <TableCell
                padding="none"
                style={{ width: '35%', textAlign: 'center' }}
              />
              <TableCell
                style={{ textAlign: 'center', wordWrap: 'normal' }}
                padding="none"
              >
                Offense
              </TableCell>
              <TableCell
                style={{ textAlign: 'center', wordWrap: 'normal' }}
                padding="none"
              >
                Defense
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.filter(r => r.level <= level).map((stat, index) => (
              <TableRow key={index}>
                <TableCell style={{ textAlign: 'center' }} padding="none">
                  {stat.home.O}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }} padding="none">
                  {stat.home.D}
                </TableCell>
                <TableCell
                  padding="none"
                  style={{
                    wordWrap: 'normal',
                    width: '35%',
                    textAlign: 'center',
                  }}
                >
                  {stat.name}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }} padding="none">
                  {stat.away.O}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }} padding="none">
                  {stat.away.D}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
)

export default StatsView
