const addOneToLast = arr => {
  const length = arr.length
  return length > 0 ? [...arr.slice(0, length - 1), arr[length - 1] + 1] : [1]
}

const compute = events => {
  const initial = {
    home: { score: 0, turns: 0, passes: [0] },
    away: { score: 0, turns: 0, passes: [] },
    points: [],
    homeHasDisc: true,
    homeOffense: true,
    firstHalf: true,
  }

  if (events.length === 0) {
    return initial
  }

  const points = events.reduce((total, event) => {
    const newHomeScore =
      event.trigger === 'homeScore'
        ? total.home.score + 1
        : total.homeHasDisc && event.trigger === 'score'
          ? total.home.score + 1
          : total.home.score
    const newAwayScore =
      event.trigger === 'awayScore'
        ? total.away.score + 1
        : !total.homeHasDisc && event.trigger === 'score'
          ? total.away.score + 1
          : total.away.score

    const newHomeTurns =
      event.trigger === 'score'
        ? 0
        : total.homeHasDisc && event.trigger === 'turn'
          ? total.home.turns + 1
          : total.home.turns
    const newAwayTurns =
      event.trigger === 'score'
        ? 0
        : !total.homeHasDisc && event.trigger === 'turn'
          ? total.away.turns + 1
          : total.away.turns

    const newHomePasses =
      event.trigger === 'score'
        ? !total.homeHasDisc
          ? [0]
          : []
        : total.homeHasDisc && event.trigger === 'turn'
          ? total.home.passes
          : !total.homeHasDisc && event.trigger === 'turn'
            ? [...total.home.passes, 0]
            : total.homeHasDisc && event.trigger === 'pass'
              ? addOneToLast(total.home.passes)
              : total.home.passes
    const newAwayPasses =
      event.trigger === 'score'
        ? total.homeHasDisc
          ? [0]
          : []
        : !total.homeHasDisc && event.trigger === 'turn'
          ? total.away.passes
          : total.homeHasDisc && event.trigger === 'turn'
            ? [...total.away.passes, 0]
            : !total.homeHasDisc && event.trigger === 'pass'
              ? addOneToLast(total.away.passes)
              : total.away.passes

    const newPoints = ['score', 'homeScore', 'awayScore'].includes(
      event.trigger
    )
      ? [
          ...total.points,
          {
            homeOPoint: total.homeOffense,
            homeScore:
              event.trigger === 'awayScore'
                ? false
                : event.trigger === 'homeScore'
                  ? true
                  : total.homeHasDisc,
            home: {
              score: newHomeScore,
              turns: total.home.turns,
              passes: total.home.passes,
            },
            away: {
              score: newAwayScore,
              turns: total.away.turns,
              passes: total.away.passes,
            },
          },
        ]
      : event.trigger === 'half'
        ? [...total.points, 'half']
        : total.points

    const newHomeHasDisc =
      event.trigger === 'half'
        ? false
        : event.trigger === 'homeScore'
          ? false
          : event.trigger === 'awayScore'
            ? true
            : event.trigger === 'pass'
              ? total.homeHasDisc
              : !total.homeHasDisc

    const newHomeOffense =
      event.trigger === 'half'
        ? false
        : event.trigger === 'homeScore'
          ? false
          : event.trigger === 'awayScore'
            ? true
            : event.trigger === 'score'
              ? total.homeHasDisc
                ? false
                : true
              : total.homeOffense

    const newTotal = {
      home: { score: newHomeScore, turns: newHomeTurns, passes: newHomePasses },
      away: { score: newAwayScore, turns: newAwayTurns, passes: newAwayPasses },
      points: newPoints,
      homeHasDisc: newHomeHasDisc,
      homeOffense: newHomeOffense,
      firstHalf: event.trigger === 'half' ? false : total.firstHalf,
    }

    return newTotal
  }, initial)

  return points
}

export default compute
