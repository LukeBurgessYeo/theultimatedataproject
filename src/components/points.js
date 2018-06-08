import React from 'react'

const PointsTable = ({ points }) => (
  <div>
    {points.length > 0 &&
      points.map((point, index) => (
        <div key={index}>
          {point === 'half'
            ? 'Halftime'
            : `${point.home.passes}, ${point.home.turns}, ${
                point.home.score
              } - ${point.away.score}, ${point.away.turns}, ${
                point.away.passes
              }`}
        </div>
      ))}
  </div>
)

export default PointsTable
