import React from 'react'
import Typography from '@material-ui/core/Typography'
import Styles from './controls.module.css'

const Button = ({ id, style, disabled, text, handler }) => (
  <Typography variant={'button'} style={{ display: 'inline' }}>
    <button id={id} className={style} disabled={disabled} onClick={handler}>
      {text.toUpperCase()}
    </button>
  </Typography>
)

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
  <div className={Styles.controls}>
    {level === 3 && (
      <Button
        id="pass"
        style={Styles.pass}
        disabled={false}
        text={
          homeHasDisc
            ? homePasses.length === 0 || homePasses[homePasses.length - 1] === 0
              ? 'Pass'
              : `Passes: ${homePasses[homePasses.length - 1]}`
            : awayPasses.length === 0 || awayPasses[awayPasses.length - 1] === 0
              ? 'Pass'
              : `Passes: ${awayPasses[awayPasses.length - 1]}`
        }
        handler={handleEvent}
      />
    )}
    {level > 1 && (
      <div className={level > 2 ? Styles.mdbuttons : ''}>
        <Button
          id="turn"
          style={Styles.turn}
          disabled={false}
          text={
            homeTurns + awayTurns === 0
              ? 'Turnover'
              : `${homeTurns} - Turns - ${awayTurns}`
          }
          handler={handleEvent}
        />
        <Button
          id="score"
          style={Styles.score}
          disabled={disableScore}
          text="Score"
          handler={handleEvent}
        />
      </div>
    )}
    {level === 1 && (
      <div className={Styles.mdbuttons}>
        <Button
          id="homeScore"
          style={Styles.pass}
          disabled={false}
          text={team1}
          handler={handleEvent}
        />
        <Button
          id="awayScore"
          style={Styles.pass}
          disabled={false}
          text={team2}
          handler={handleEvent}
        />
      </div>
    )}
    <Button
      id="half"
      style={Styles.half}
      disabled={disableHalf}
      text="Half"
      handler={handleEvent}
    />
    <Button
      id="undo"
      style={Styles.undo}
      disabled={disableUndo}
      text="Undo"
      handler={handleEvent}
    />
  </div>
)

export default Controls
