import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const scoreHold = {
  color: '#3f51b5',
  textAlign: 'center',
  fontWeight: 'bold',
}

const concedeHold = {
  color: '#f5bc00',
  textAlign: 'center',
}

const scoreBreak = {
  color: '#2bca35',
  textAlign: 'center',
  fontWeight: 'bold',
}

const concedeBreak = {
  color: '#f50057',
  textAlign: 'center',
}

const getStyle = (home, homeO, homeScore) =>
  homeO
    ? homeScore
      ? home
        ? scoreHold
        : concedeHold
      : home
        ? concedeBreak
        : scoreBreak
    : homeScore
      ? home
        ? scoreBreak
        : concedeBreak
      : home
        ? concedeHold
        : scoreHold

const PointsTable = ({ points, level, team1, team2 }) => (
  <div>
    <Table style={{ tableLayout: 'fixed', maxWidth: '100%' }}>
      <TableHead>
        <TableRow>
          <TableCell
            style={{ textAlign: 'center' }}
            colSpan={level}
            padding="none"
          >
            {team1}
          </TableCell>
          <TableCell />
          <TableCell
            style={{ textAlign: 'center' }}
            colSpan={level}
            padding="none"
            numeric
          >
            {team2}
          </TableCell>
        </TableRow>
        <TableRow>
          {level > 2 && (
            <TableCell
              padding="none"
              style={{ textAlign: 'center', minWidth: '50px' }}
            >
              Passes
            </TableCell>
          )}
          {level > 1 && (
            <TableCell
              padding="none"
              style={{ textAlign: 'center', minWidth: '50px' }}
            >
              Turns
            </TableCell>
          )}
          <TableCell padding="none" style={{ textAlign: 'center' }}>
            O/D
          </TableCell>
          <TableCell padding="none" style={{ textAlign: 'center' }}>
            Score
          </TableCell>
          <TableCell padding="none" style={{ textAlign: 'center' }}>
            O/D
          </TableCell>
          {level > 1 && (
            <TableCell padding="none" style={{ textAlign: 'center' }}>
              Turns
            </TableCell>
          )}
          {level > 2 && (
            <TableCell padding="none" style style={{ textAlign: 'center' }}>
              Passes
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
                    colSpan={1 + level * 2}
                    padding="none"
                    style={{ textAlign: 'center', minWidth: '50px' }}
                  >
                    Halftime
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={index}>
                  {level > 2 && (
                    <TableCell
                      padding="none"
                      style={{
                        ...getStyle(true, point.homeOPoint, point.homeScore),
                        minWidth: '50px',
                      }}
                    >
                      {point.home.passes.join(',') || '-'}
                    </TableCell>
                  )}
                  {level > 1 && (
                    <TableCell
                      padding="none"
                      style={getStyle(true, point.homeOPoint, point.homeScore)}
                    >
                      {point.home.turns}
                    </TableCell>
                  )}
                  <TableCell
                    padding="none"
                    style={getStyle(true, point.homeOPoint, point.homeScore)}
                  >
                    {point.homeOPoint ? 'O' : 'D'}
                  </TableCell>
                  <TableCell padding="none" style={{ textAlign: 'center' }}>
                    <span style={point.homeScore ? { fontWeight: 'bold' } : {}}>
                      {point.home.score}
                    </span>
                    {' - '}
                    <span style={point.homeScore ? {} : { fontWeight: 'bold' }}>
                      {point.away.score}
                    </span>
                  </TableCell>
                  <TableCell
                    padding="none"
                    style={getStyle(false, point.homeOPoint, point.homeScore)}
                  >
                    {point.homeOPoint ? 'D' : 'O'}
                  </TableCell>
                  {level > 1 && (
                    <TableCell
                      padding="none"
                      style={getStyle(false, point.homeOPoint, point.homeScore)}
                    >
                      {point.away.turns}
                    </TableCell>
                  )}
                  {level > 2 && (
                    <TableCell
                      padding="none"
                      style={{
                        ...getStyle(false, point.homeOPoint, point.homeScore),
                        minWidth: '50px',
                      }}
                      numeric
                    >
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
