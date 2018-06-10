import React from 'react'

const Controls = ({
  level,
  handleEvent,
  team1,
  team2,
  disableScore,
  disableUndo,
  disableHalf,
}) => (
  <div>
    {level === 3 && (
      <button id="pass" onClick={handleEvent}>
        Pass
      </button>
    )}
    {level > 1 && (
      <div>
        <button id="turn" onClick={handleEvent}>
          Turnover
        </button>
        <button id="score" disabled={disableScore} onClick={handleEvent}>
          Score
        </button>
      </div>
    )}
    {level === 1 && (
      <div>
        <button id="homeScore" onClick={handleEvent}>
          {team1}
        </button>
        <button id="awayScore" onClick={handleEvent}>
          {team2}
        </button>
      </div>
    )}
    <button id="undo" disabled={disableUndo} onClick={handleEvent}>
      Undo
    </button>
    <button id="half" disabled={disableHalf} onClick={handleEvent}>
      Half
    </button>
  </div>
)

export default Controls
