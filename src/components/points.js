import React from 'react'

const PointsTable = ({ points }) => (
  <div>
    Team 1 - Team 2<br />
    Passes | Turns | Score | Turns | Passes
    {points.length > 0 &&
      points.map((point, index) => (
        <div key={index}>
          {point === 'half'
            ? 'Halftime'
            : `${point.home.passes.join(',')} | ${point.home.turns} | ${
            point.home.score
            } - ${point.away.score} | ${point.away.turns} | ${
            point.away.passes.join(',')
            }`}
        </div>
      ))}
  </div>
)

export default PointsTable
