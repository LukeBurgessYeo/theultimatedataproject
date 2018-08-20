import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const InfoModal = ({ open, close, title }) => (
  <Dialog
    open={open}
    onClose={close}
    maxWidth="md"
    aria-labelledby="info-dialog-title"
    aria-describedby="info-dialog-content"
  >
    <DialogTitle id="info-dialog-title">About</DialogTitle>
    <DialogContent>
      <DialogContentText id="info-dialog-title">
        {title} was originally inspired by the work of Sion 'Brummie' Scone who{' '}
        <a
          href="https://ultiworld.com/2016/10/25/basic-team-analysis-using-four-metrics/"
          target="_blank"
        >
          described a simple method
        </a>{' '}
        for collecting information about a teams performance quickly and easily
        from the sideline whilst watching a game.
        <br />
        <br />
        The natural next step was to take this process, automate the analysis
        and develop a sleek, easy to use interface for collecting the data.
        Hence {title} was born in an attempt to bring better data collection and
        analysis to the sport of ultimate.
        <br />
        <br />
        {title} is intended mainly for commentators and score-keepers to
        impartially keep track of games, however, coaches may also find it to be
        a useful tool.
        <br />
        <br />
        This version of {title} is meant as a 'technical alpha' release to test
        that all the basic functionality works as expected. More features will
        be added in time.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
)

export default InfoModal
