import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const PointsTable = ({ points, level }) => (
  <div>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ textAlign: 'center', borderRight: '1px solid #e0e0e0' }} colSpan={level + 1} padding='none'>Team 1</TableCell>
          <TableCell style={{ textAlign: 'center' }} colSpan={level + 1} padding='none' numeric>Team 2</TableCell>
        </TableRow>
        <TableRow>
          {level > 2 && <TableCell padding='none'>Passes</TableCell>}
          {level > 1 && <TableCell padding='none'>Turns</TableCell>}
          <TableCell padding='none'>O/D</TableCell>
          <TableCell padding='none' style={{ borderRight: '1px solid #e0e0e0' }}>Score</TableCell>
          <TableCell padding='none' numeric>Score</TableCell>
          <TableCell padding='none' numeric>O/D</TableCell>
          {level > 1 && <TableCell padding='none' numeric>Turns</TableCell>}
          {level > 2 && <TableCell padding='none' numeric>Passes</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody style={{ width: '100%' }}>
        {points.length > 0 &&
          points.map((point, index) => (
            point === 'half'
              ? <TableRow key={index}>
                <TableCell colSpan={6} padding='none' style={{ textAlign: 'center' }}>Halftime</TableCell>
              </TableRow>
              : <TableRow key={index}>
                {level > 2 && <TableCell padding='none'>{point.home.passes.join(',') || '-'}</TableCell>}
                {level > 1 && <TableCell padding='none'>{point.home.turns}</TableCell>}
                <TableCell padding='none'>{point.homeOPoint ? 'O' : 'D'}</TableCell>
                <TableCell padding='none' style={{ borderRight: '1px solid #e0e0e0' }}>{point.home.score}</TableCell>
                <TableCell padding='none' numeric>{point.away.score}</TableCell>
                <TableCell padding='none' numeric>{point.homeOPoint ? 'D' : 'O'}</TableCell>
                {level > 1 && <TableCell padding='none' numeric>{point.away.turns}</TableCell>}
                {level > 2 && <TableCell padding='none' numeric>{point.away.passes.join(',') || '-'}</TableCell>}
              </TableRow>

          ))}
      </TableBody>
    </Table>
  </div>
)

export default PointsTable
