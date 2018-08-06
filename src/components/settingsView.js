import React from 'react'
import { navigateTo } from 'gatsby-link'
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
import Modal from '@material-ui/core/Modal'
import html2canvas from 'html2canvas'
import Styles from './settings.module.css'
import { Typography } from '@material-ui/core'

const inputStyles = {
  width: '100%',
  marginBottom: '16px',
}

class GameSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  deleteGame = () => {
    let updated = JSON.parse(localStorage.getItem('games'))
    const game = updated.filter(
      g => g.id === window.location.pathname.split('/')[2]
    )[0]
    updated.splice(updated.indexOf(game), 1)
    localStorage.setItem('games', JSON.stringify(updated))
    navigateTo('/')
  }

  saveGame = () => {
    const { title, team1, team2 } = this.props
    document.getElementById('hiddenData').style.display = 'block'
    html2canvas(document.getElementById('savedGameData'))
      .then(canvas => {
        document.getElementById('capture').appendChild(canvas)
      })
      .then(() => {
        var link = document.createElement('a')
        link.download = `${title} - ${team1} vs ${team2}.png`
        link.href = document.getElementsByTagName('canvas')[0].toDataURL()
        link.click()
      })
      .then(() => {
        document.getElementsByTagName('canvas')[0].remove()
        document.getElementById('hiddenData').style.display = 'none'
      })
  }

  render() {
    const {
      display,
      disabled,
      title,
      handleChange,
      team1,
      team2,
      switchSides,
      level,
    } = this.props
    return (
      <div>
        <Card
          className={
            display ? [Styles.show, Styles.hide].join(' ') : Styles.hide
          }
        >
          <CardContent style={{ maxWidth: '520px', margin: '0 auto' }}>
            <FormControl style={inputStyles}>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input id="title" value={title} onChange={handleChange} />
            </FormControl>
            <div style={{ marginBottom: inputStyles.marginBottom }}>
              <FormControl style={{ width: '40%' }}>
                <InputLabel htmlFor="team1">Starting Offense</InputLabel>
                <Input id="team1" value={team1} onChange={handleChange} />
              </FormControl>
              <span
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '20%',
                }}
              >
                <IconButton onClick={switchSides}>
                  <SwapHoriz />
                </IconButton>
              </span>
              <FormControl style={{ width: '40%' }}>
                <InputLabel htmlFor="team2">Starting Defense</InputLabel>
                <Input id="team2" value={team2} onChange={handleChange} />
              </FormControl>
            </div>
            <FormControl style={inputStyles}>
              <InputLabel htmlFor="level">Track Which Stats?</InputLabel>
              <Select
                value={level}
                onChange={handleChange}
                disabled={disabled}
                inputProps={{
                  name: 'level',
                  id: 'level',
                }}
              >
                <MenuItem value={1}>Score</MenuItem>
                <MenuItem value={2}>Score, Turnovers</MenuItem>
                <MenuItem value={3}>Score, Turnovers, Passes</MenuItem>
              </Select>
            </FormControl>
            <Button
              disabled={false}
              variant="outlined"
              color="secondary"
              onClick={this.handleOpen}
            >
              Delete Game
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.saveGame}
              style={{ float: 'right' }}
              disabled={!disabled}
            >
              Save Game
            </Button>
          </CardContent>
        </Card>
        <Modal
          aria-labelledby="delete-game"
          aria-describedby="do you want to delete this game?"
          open={this.state.open}
          onClose={this.handleClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            WebkitAlignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card
            style={{
              width: '90%',
              maxWidth: '500px',
              position: 'absolute',
              top: '200px',
              margin: 'auto',
            }}
          >
            <CardContent>
              <Typography paragraph={true} variant="subheading">
                Are you sure you want to delete this game? This cannot be
                undone.
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.deleteGame}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </Modal>
      </div>
    )
  }
}

export default GameSettings
