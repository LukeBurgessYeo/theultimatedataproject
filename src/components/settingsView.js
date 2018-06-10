import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SwapHoriz from '@material-ui/icons/SwapHoriz'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Styles from './settings.module.css'

const inputStyles = {
  width: '100%',
  marginBottom: '16px',
}

const options = ['Score', 'Score + Turnovers', 'Score + Turnovers + Passes']

const GameSettings = ({
  display,
  title,
  handleChange,
  team1,
  team2,
  switchSides,
  level,
  deleteGame,
}) => (
  <Card
    className={display ? [Styles.show, Styles.hide].join(' ') : Styles.hide}
  >
    <CardContent>
      <FormControl style={inputStyles}>
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input id="title" value={title} onChange={handleChange} />
      </FormControl>
      <div style={{ marginBottom: inputStyles.marginBottom }}>
        <FormControl style={{ width: '40%' }}>
          <InputLabel htmlFor="team1">Starting Offense:</InputLabel>
          <Input id="team1" value={team1} onChange={handleChange} />
        </FormControl>
        <span
          style={{ display: 'inline-block', textAlign: 'center', width: '20%' }}
        >
          <IconButton onClick={switchSides}>
            <SwapHoriz />
          </IconButton>
        </span>
        <FormControl style={{ width: '40%' }}>
          <InputLabel htmlFor="team2">Starting Defense:</InputLabel>
          <Input id="team2" value={team2} onChange={handleChange} />
        </FormControl>
      </div>
      <FormControl style={inputStyles}>
        <InputLabel htmlFor="level">Track Which Stats?</InputLabel>
        <Select
          value={level}
          onChange={handleChange}
          inputProps={{
            name: 'level',
            id: 'level',
          }}
        >
          <MenuItem value={1}>Score</MenuItem>
          <MenuItem value={2}>Score + Turnovers</MenuItem>
          <MenuItem value={3}>Score + Turnoers + Passes</MenuItem>
        </Select>
      </FormControl>
      <Button
        disabled={true}
        variant="outlined"
        color="secondary"
        onClick={deleteGame}
      >
        Delete Game
      </Button>
    </CardContent>
  </Card>
)

export default GameSettings
