const { localStorage } = window

const getInitialState = () => {
  const state = {
    score: 0,
    scrolling: false,
    hiscore: 0,
  }
  if (localStorage.NeverendingNoodles) {
    const save = JSON.parse(localStorage.NeverendingNoodles)
    state.hiscore = save.hiscore
  }
  return state
}

const INITIAL_STATE = getInitialState()
const ACTIONS = {
  ACTIVATE_SCROLLING: 'ACTIVATE_SCROLLING',
  DEACTIVATE_SCROLLING: 'DEACTIVATE_SCROLLING',
  TOGGLE_SCROLL: 'TOGGLE_SCROLL',
  SET_SCORE: 'SET_SCORE',
  RESET_GAME: 'RESET_GAME'
}

const AppReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_SCORE:
      return {
        ...state,
        score: action.score,
        hiscore: Math.max(state.hiscore, action.score),
      }
    case ACTIONS.ACTIVATE_SCROLLING:
      return { ...state, scrolling: true }
    case ACTIONS.DEACTIVATE_SCROLLING:
      return { ...state, scrolling: false }
    case ACTIONS.RESET_GAME:
      return getInitialState()
    default:
      return state
  }
}

export { AppReducer, ACTIONS, INITIAL_STATE }
