import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  pass: {
    width: '100%',
    height: '100px',
    margin: '10px 0',
    borderColor: '#3f51b5',
    color: '#FFFFFF',
    backgroundColor: '#3f51b5',
  },
  turn: {
    width: '100%',
    height: '100px',
    margin: '10px 0',
    borderColor: '#f50057',
    color: '#FFFFFF',
    backgroundColor: '#f50057',
  },
  score: {
    width: '100%',
    height: '100px',
    margin: '10px 0',
    borderColor: '#2bca35',
    color: '#FFFFFF',
    backgroundColor: '#2bca35',
  },
  half: {
    width: '30%',
    height: '50px',
    margin: '10px 2%',
    borderColor: '#757de8',
    color: '#757de8',
  },
  undo: {
    width: '30%',
    height: '50px',
    margin: '10px 2%',
    borderColor: '#f5bc00',
    color: '#f5bc00',
  },
  mdButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  medium: {
    width: '100%',
    height: '100px',
    margin: '10px 0',
  },
  small: {
    width: '30%',
    height: '50px',
    margin: '10px 2%',
  },
}

const Controls = ({
  level,
  handleEvent,
  homeHasDisc,
  team1,
  team2,
  disableScore,
  disableUndo,
  disableHalf,
  homeTurns,
  awayTurns,
  homePasses,
  awayPasses,
}) => (
  <div style={{ marginTop: '30px' }}>
    {level === 3 && (
      <Button
        id="pass"
        style={styles.pass}
        variant={'contained'}
        onClick={() => handleEvent('pass')}
      >
        {homeHasDisc
          ? homePasses.length === 0 || homePasses[homePasses.length - 1] === 0
            ? 'Pass'
            : `Passes: ${homePasses[homePasses.length - 1]}`
          : awayPasses.length === 0 || awayPasses[awayPasses.length - 1] === 0
            ? 'Pass'
            : `Passes: ${awayPasses[awayPasses.length - 1]}`}
      </Button>
    )}
    {level > 1 && (
      <div style={level > 2 ? styles.mdButtons : {}}>
        <Button
          id="turn"
          style={styles.turn}
          variant={'contained'}
          onClick={() => handleEvent('turn')}
        >
          {homeTurns + awayTurns === 0
            ? 'Turnover'
            : `${homeTurns} - Turns - ${awayTurns}`}
        </Button>
        <div style={{ width: '4%', flexShrink: '0' }} />
        <Button
          id="score"
          style={disableScore ? styles.medium : styles.score}
          disabled={disableScore}
          variant={'contained'}
          onClick={() => handleEvent('score')}
        >
          Score
        </Button>
      </div>
    )}
    {level === 1 && (
      <div style={styles.mdButtons}>
        <Button
          id="homeScore"
          style={styles.pass}
          variant={'contained'}
          onClick={() => handleEvent('homeScore')}
        >
          {team1}
        </Button>
        <div style={{ width: '4%', flexShrink: '0' }} />
        <Button
          id="awayScore"
          style={styles.pass}
          variant={'contained'}
          onClick={() => handleEvent('awayScore')}
        >
          {team2}
        </Button>
      </div>
    )}
    <Button
      id="half"
      style={disableHalf ? styles.small : styles.half}
      disabled={disableHalf}
      variant={'outlined'}
      onClick={() => handleEvent('half')}
    >
      Half
    </Button>
    <Button
      id="undo"
      style={disableUndo ? styles.small : styles.undo}
      disabled={disableUndo}
      variant={'outlined'}
      onClick={() => handleEvent('undo')}
    >
      Undo
    </Button>
  </div>
)

export default Controls
