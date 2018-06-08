import React from 'react'

const Settings = ({
  toggleSettings,
  disabled,
  display,
  title,
  handleChange,
  team1,
  team2,
  switchSides,
  level,
  deleteGame,
}) => (
  <div>
    <button onClick={toggleSettings}>Settings</button>
    <div style={{ display: display }}>
      <div>
        Title:<input
          id="title"
          type="text"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div>
        Starting Offense:<input
          id="team1"
          type="text"
          value={team1}
          onChange={handleChange}
        />
      </div>
      <div>
        Starting Defense:<input
          id="team2"
          type="text"
          value={team2}
          onChange={handleChange}
        />
      </div>
      <button onClick={switchSides}>Switch Sides</button>
      <div>Track Which Stats?</div>
      <input
        type="radio"
        name="level"
        value={1}
        disabled={disabled}
        checked={level === 1}
        onChange={handleChange}
      />{' '}
      Score<br />
      <input
        type="radio"
        name="level"
        value={2}
        disabled={disabled}
        checked={level === 2}
        onChange={handleChange}
      />{' '}
      Score + Turnovers<br />
      <input
        type="radio"
        name="level"
        value={3}
        disabled={disabled}
        checked={level === 3}
        onChange={handleChange}
      />{' '}
      Score + Turnovers + Passes
      <br />
      <button onClick={deleteGame}>Delete Game</button>
    </div>
  </div>
)

export default Settings
