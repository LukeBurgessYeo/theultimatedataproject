const twoDP = num => Math.round(num * 100) / 100

const sum = arr => arr.reduce((a, b) => a + b, 0)

const divide = (top, bottom) => (bottom === 0 ? '-' : twoDP(top / bottom))

const percent = (top, bottom) =>
  divide(top, bottom) === '-' ? '-' : `${divide(top, bottom) * 100}%`

const compute = points => {
  const initial = {
    pointsPlayed: {
      home: {
        O: 0,
        D: 0,
      },
      away: {
        O: 0,
        D: 0,
      },
    },
    hadDiscPoints: {
      home: {
        O: 0,
        D: 0,
      },
      away: {
        O: 0,
        D: 0,
      },
    },
    scores: {
      home: {
        O: 0,
        D: 0,
      },
      away: {
        O: 0,
        D: 0,
      },
    },
    noTurnScores: {
      home: {
        O: 0,
        D: 0,
      },
      away: {
        O: 0,
        D: 0,
      },
    },
    turns: {
      home: {
        O: 0,
        D: 0,
      },
      away: {
        O: 0,
        D: 0,
      },
    },
    passes: {
      home: {
        O: 0,
        D: 0,
      },
      away: {
        O: 0,
        D: 0,
      },
    },
    possessions: {
      home: {
        O: 0,
        D: 0,
      },
      away: {
        O: 0,
        D: 0,
      },
    },
  }

  return points.filter(p => p !== 'half').reduce((total, point) => {
    const newPointsPlayed = point.homeOPoint
      ? {
          home: {
            O: total.pointsPlayed.home.O + 1,
            D: total.pointsPlayed.home.D,
          },
          away: {
            O: total.pointsPlayed.away.O,
            D: total.pointsPlayed.away.D + 1,
          },
        }
      : {
          home: {
            O: total.pointsPlayed.home.O,
            D: total.pointsPlayed.home.D + 1,
          },
          away: {
            O: total.pointsPlayed.away.O + 1,
            D: total.pointsPlayed.away.D,
          },
        }

    const newHadDiscPoints = point.homeOPoint
      ? {
          home: {
            O: total.pointsPlayed.home.O + 1,
            D: total.hadDiscPoints.home.D,
          },
          away: {
            O: total.hadDiscPoints.away.O,
            D: total.hadDiscPoints.away.D + (point.home.turns > 0 ? 1 : 0),
          },
        }
      : {
          home: {
            O: total.hadDiscPoints.home.O,
            D: total.hadDiscPoints.home.D + (point.away.turns > 0 ? 1 : 0),
          },
          away: {
            O: total.pointsPlayed.away.O + 1,
            D: total.hadDiscPoints.away.D,
          },
        }

    const newScores = point.homeOPoint
      ? {
          home: {
            O: total.scores.home.O + (point.homeScore ? 1 : 0),
            D: total.scores.home.D,
          },
          away: {
            O: total.scores.away.O,
            D: total.scores.away.D + (point.homeScore ? 0 : 1),
          },
        }
      : {
          home: {
            O: total.scores.home.O,
            D: total.scores.home.D + (point.homeScore ? 1 : 0),
          },
          away: {
            O: total.scores.away.O + (point.homeScore ? 0 : 1),
            D: total.scores.away.D,
          },
        }

    const newNoTurnScores = point.homeOPoint
      ? {
          home: {
            O:
              total.noTurnScores.home.O +
              (point.homeScore && point.home.turns === 0 ? 1 : 0),
            D: total.noTurnScores.home.D,
          },
          away: {
            O: total.noTurnScores.away.O,
            D:
              total.noTurnScores.away.D +
              (!point.homeScore && point.away.turns === 0 ? 1 : 0),
          },
        }
      : {
          home: {
            O: total.noTurnScores.home.O,
            D:
              total.noTurnScores.home.D +
              (point.homeScore && point.home.turns === 0 ? 1 : 0),
          },
          away: {
            O:
              total.noTurnScores.away.O +
              (!point.homeScore && point.away.turns === 0 ? 1 : 0),
            D: total.noTurnScores.away.D,
          },
        }

    const newTurns = point.homeOPoint
      ? {
          home: {
            O: total.turns.home.O + point.home.turns,
            D: total.turns.home.D,
          },
          away: {
            O: total.turns.away.O,
            D: total.turns.away.D + point.away.turns,
          },
        }
      : {
          home: {
            O: total.turns.home.O,
            D: total.turns.home.D + point.home.turns,
          },
          away: {
            O: total.turns.away.O + point.away.turns,
            D: total.turns.away.D,
          },
        }

    const newPasses = point.homeOPoint
      ? {
          home: {
            O: total.passes.home.O + sum(point.home.passes),
            D: total.passes.home.D,
          },
          away: {
            O: total.passes.away.O,
            D: total.passes.away.D + sum(point.away.passes),
          },
        }
      : {
          home: {
            O: total.passes.home.O,
            D: total.passes.home.D + sum(point.home.passes),
          },
          away: {
            O: total.passes.away.O + sum(point.away.passes),
            D: total.passes.away.D,
          },
        }

    const newPossessions = point.homeOPoint
      ? {
          home: {
            O: total.possessions.home.O + point.home.passes.length,
            D: total.possessions.home.D,
          },
          away: {
            O: total.possessions.away.O,
            D: total.possessions.away.D + point.away.passes.length,
          },
        }
      : {
          home: {
            O: total.possessions.home.O,
            D: total.possessions.home.D + point.home.passes.length,
          },
          away: {
            O: total.possessions.away.O + point.away.passes.length,
            D: total.possessions.away.D,
          },
        }

    return {
      pointsPlayed: {
        home: {
          O: newPointsPlayed.home.O,
          D: newPointsPlayed.home.D,
        },
        away: {
          O: newPointsPlayed.away.O,
          D: newPointsPlayed.away.D,
        },
      },
      hadDiscPoints: {
        home: {
          O: newHadDiscPoints.home.O,
          D: newHadDiscPoints.home.D,
        },
        away: {
          O: newHadDiscPoints.away.O,
          D: newHadDiscPoints.away.D,
        },
      },
      scores: {
        home: {
          O: newScores.home.O,
          D: newScores.home.D,
        },
        away: {
          O: newScores.away.O,
          D: newScores.away.D,
        },
      },
      noTurnScores: {
        home: {
          O: newNoTurnScores.home.O,
          D: newNoTurnScores.home.D,
        },
        away: {
          O: newNoTurnScores.away.O,
          D: newNoTurnScores.away.D,
        },
      },
      turns: {
        home: {
          O: newTurns.home.O,
          D: newTurns.home.D,
        },
        away: {
          O: newTurns.away.O,
          D: newTurns.away.D,
        },
      },
      passes: {
        home: {
          O: newPasses.home.O,
          D: newPasses.home.D,
        },
        away: {
          O: newPasses.away.O,
          D: newPasses.away.D,
        },
      },
      possessions: {
        home: {
          O: newPossessions.home.O,
          D: newPossessions.home.D,
        },
        away: {
          O: newPossessions.away.O,
          D: newPossessions.away.D,
        },
      },
    }
  }, initial)
}

const computeStats = points => {
  const stats = compute(points)
  return [
    {
      name: 'Scores',
      level: 1,
      home: {
        O: `${stats.scores.home.O}/${stats.pointsPlayed.home.O}`,
        D: `${stats.scores.home.D}/${stats.hadDiscPoints.home.D}`,
      },
      away: {
        O: `${stats.scores.away.O}/${stats.pointsPlayed.away.O}`,
        D: `${stats.scores.away.D}/${stats.hadDiscPoints.away.D}`,
      },
    },
    {
      name: 'Perfect Scores',
      level: 2,
      home: {
        O: `${stats.noTurnScores.home.O}/${stats.hadDiscPoints.home.O}`,
        D: `${stats.noTurnScores.home.D}/${stats.hadDiscPoints.home.D}`,
      },
      away: {
        O: `${stats.noTurnScores.away.O}/${stats.hadDiscPoints.away.O}`,
        D: `${stats.noTurnScores.away.D}/${stats.hadDiscPoints.away.D}`,
      },
    },
    {
      name: 'Turnovers',
      level: 2,
      home: {
        O: `${stats.turns.home.O}`,
        D: `${stats.turns.home.D}`,
      },
      away: {
        O: `${stats.turns.away.O}`,
        D: `${stats.turns.away.D}`,
      },
    },
    {
      name: 'Blocks',
      level: 2,
      home: {
        O: `${stats.turns.away.D}`,
        D: `${stats.turns.away.O}`,
      },
      away: {
        O: `${stats.turns.home.D}`,
        D: `${stats.turns.home.O}`,
      },
    },
    {
      name: 'Breaks',
      level: 1,
      home: {
        O: `${stats.scores.away.D * -1}`,
        D: `${stats.scores.home.D}`,
      },
      away: {
        O: `${stats.scores.home.D * -1}`,
        D: `${stats.scores.away.D}`,
      },
    },
    {
      name: 'Turnovers Per Point',
      level: 2,
      home: {
        O: `${divide(stats.turns.home.O, stats.hadDiscPoints.home.O)}`,
        D: `${divide(stats.turns.home.D, stats.hadDiscPoints.home.D)}`,
      },
      away: {
        O: `${divide(stats.turns.away.O, stats.hadDiscPoints.away.O)}`,
        D: `${divide(stats.turns.away.D, stats.hadDiscPoints.away.D)}`,
      },
    },
    {
      name: 'Recovered Points',
      level: 2,
      home: {
        O: `${stats.scores.home.O - stats.noTurnScores.home.O}/${
          stats.hadDiscPoints.home.O
        }`,
        D: `${stats.scores.home.D - stats.noTurnScores.home.D}/${
          stats.hadDiscPoints.home.D
        }`,
      },
      away: {
        O: `${stats.scores.away.O - stats.noTurnScores.away.O}/${
          stats.hadDiscPoints.away.O
        }`,
        D: `${stats.scores.away.D - stats.noTurnScores.away.D}/${
          stats.hadDiscPoints.away.D
        }`,
      },
    },
    {
      name: 'Successful Defensive Points',
      level: 2,
      home: {
        O: '',
        D: `${stats.hadDiscPoints.home.D}/${stats.pointsPlayed.home.D}`,
      },
      away: {
        O: '',
        D: `${stats.hadDiscPoints.away.D}/${stats.pointsPlayed.away.D}`,
      },
    },
    {
      name: 'Total Passes',
      level: 3,
      home: {
        O: `${stats.passes.home.O}`,
        D: `${stats.passes.home.D}`,
      },
      away: {
        O: `${stats.passes.away.O}`,
        D: `${stats.passes.away.D}`,
      },
    },
    {
      name: 'Completion Rate',
      level: 3,
      home: {
        O: percent(
          stats.passes.home.O,
          stats.turns.home.O + stats.passes.home.O
        ),
        D: percent(
          stats.passes.home.D,
          stats.turns.home.D + stats.passes.home.D
        ),
      },
      away: {
        O: percent(
          stats.passes.away.O,
          stats.turns.away.O + stats.passes.away.O
        ),
        D: percent(
          stats.passes.away.D,
          stats.turns.away.D + stats.passes.away.D
        ),
      },
    },
    {
      name: 'Passes Per Point',
      level: 3,
      home: {
        O: `${divide(stats.passes.home.O, stats.hadDiscPoints.home.O)}`,
        D: `${divide(stats.passes.home.D, stats.hadDiscPoints.home.D)}`,
      },
      away: {
        O: `${divide(stats.passes.away.O, stats.hadDiscPoints.away.O)}`,
        D: `${divide(stats.passes.away.D, stats.hadDiscPoints.away.D)}`,
      },
    },
    {
      name: 'Passes Per Possession',
      level: 3,
      home: {
        O: `${divide(stats.passes.home.O, stats.possessions.home.O)}`,
        D: `${divide(stats.passes.home.D, stats.possessions.home.D)}`,
      },
      away: {
        O: `${divide(stats.passes.away.O, stats.possessions.away.O)}`,
        D: `${divide(stats.passes.away.D, stats.possessions.away.D)}`,
      },
    },
  ]
}

export default computeStats
