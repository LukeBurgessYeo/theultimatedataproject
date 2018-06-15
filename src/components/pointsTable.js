import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const PointsTable = ({ points, level, team1, team2 }) => (
  <div>
    <Table style={{ tableLayout: 'fixed', maxWidth: '100%' }}>
      <TableHead>
        <TableRow>
          <TableCell
            style={{ textAlign: 'center', borderRight: '1px solid #e0e0e0' }}
            colSpan={level + 1}
            padding="none"
          >
            {team1}
          </TableCell>
          <TableCell
            style={{ textAlign: 'center' }}
            colSpan={level + 1}
            padding="none"
            numeric
          >
            {team2}
          </TableCell>
        </TableRow>
        <TableRow>
          {level > 2 && <TableCell padding="none" style={{ textAlign: 'center' }}>Pass</TableCell>}
          {level > 1 && <TableCell padding="none" style={{ textAlign: 'center' }}>Turn</TableCell>}
          <TableCell padding="none" style={{ textAlign: 'center' }}>O/D</TableCell>
          <TableCell
            padding="none"
            style={{
              borderRight: '1px solid #e0e0e0',
              textAlign: 'center'
            }}
          >
            Score
          </TableCell>
          <TableCell padding="none" numeric style={{ textAlign: 'center' }}>
            Score
          </TableCell>
          <TableCell padding="none" numeric style={{ textAlign: 'center' }}>
            O/D
          </TableCell>
          {level > 1 && (
            <TableCell padding="none" numeric style={{ textAlign: 'center' }}>
              Turn
            </TableCell>
          )}
          {level > 2 && (
            <TableCell padding="none" numeric style style={{ textAlign: 'center' }}>
              Pass
            </TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {points.length > 0 &&
          points.map(
            (point, index) =>
              point === 'half' ? (
                <TableRow key={index}>
                  <TableCell
                    colSpan={6}
                    padding="none"
                    style={{ textAlign: 'center', minWidth: '50px' }}
                  >
                    Halftime
                  </TableCell>
                </TableRow>
              ) : (
                  <TableRow key={index}>
                    {level > 2 && (
                      <TableCell padding="none">
                        {point.home.passes.join(',') || '-'}
                      </TableCell>
                    )}
                    {level > 1 && (
                      <TableCell padding="none" style={{ textAlign: 'center' }}>{point.home.turns}</TableCell>
                    )}
                    <TableCell padding="none" style={{ textAlign: 'center' }}>
                      {point.homeOPoint ? 'O' : 'D'}
                    </TableCell>
                    <TableCell
                      padding="none"
                      style={{ borderRight: '1px solid #e0e0e0', textAlign: 'center' }}
                    >
                      {point.home.score}
                    </TableCell>
                    <TableCell padding="none" style={{ textAlign: 'center' }}>
                      {point.away.score}
                    </TableCell>
                    <TableCell padding="none" style={{ textAlign: 'center' }}>
                      {point.homeOPoint ? 'D' : 'O'}
                    </TableCell>
                    {level > 1 && (
                      <TableCell padding="none" style={{ textAlign: 'center' }}>
                        {point.away.turns}
                      </TableCell>
                    )}
                    {level > 2 && (
                      <TableCell padding="none" numeric>
                        {point.away.passes.join(',') || '-'}
                      </TableCell>
                    )}
                  </TableRow>
                )
          )}
      </TableBody>
    </Table>
  </div>
)

export default PointsTable
