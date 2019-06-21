import React, { Fragment, useState, useRef, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import { TweenMax, TimelineMax } from 'gsap'
import {NOODLES, INACTIVE_LIMIT, OBSERVER_OPTIONS} from './constants'
import { ACTIONS, INITIAL_STATE, AppReducer } from './reducer'
import Bowl from './components/bowl'
import Score from './components/score'
import Noodles from './components/noodles'
import Scene from './components/scene.js'

const Target = styled.div`
  height: 10px;
`

const onObserve = (observe, dispatch, noodles, target, scene, timeout) => entries => {
  if (!observe.current) return
  for (const entry of entries) {
    if (entry.isIntersecting && window.scrollY !== 0) {
      dispatch({ type: ACTIONS.ACTIVATE_SCROLLING })
      const newHeight =
        noodles.current.offsetHeight + target.current.offsetHeight
      TweenMax.to(scene.current, 0.1, {
        height: scene.current.offsetHeight + target.current.offsetHeight,
      })
      TweenMax.to(noodles.current, 0.1, {
        height: newHeight,
      })
      dispatch({ type: ACTIONS.SET_SCORE, score: newHeight })
    } else {
      const resetBowl = () => {
        dispatch({ type: ACTIONS.DEACTIVATE_SCROLLING })
        timeout.current = null
      }
      if (timeout.current) clearTimeout(timeout.current)
      timeout.current = setTimeout(resetBowl, 500)
    }
  }
}
const App = () => {
  const scene = useRef(null)
  const noodles = useRef(null)
  const target = useRef(null)
  const timeout = useRef(null)
  const observe = useRef(true)
  const inactivityRef = useRef(null)
  const [{ scrolling, score, hiscore }, dispatch] = useReducer(
    AppReducer,
    INITIAL_STATE
  )
  // const [noodleType, setNoodleType] = useState(NOODLES.RICE)

  const reset = () => {
    new TimelineMax({
      onStart: () => {
        observe.current = false
      },
      onComplete: () => {
        observe.current = true
        window.scrollTo(0, 0)
        dispatch({ type: ACTIONS.RESET_GAME })
      },
    })
      .add(TweenMax.to(scene.current, 0.1, { height: window.innerHeight }), 0)
      .add(TweenMax.to(noodles.current, 0.1, { height: 100 }), 0)
  }
  useEffect(() => {
    const current = JSON.parse(localStorage.getItem('NeverendingNoodles'))
    const userState = {
      hiscore: current ? Math.max(score, current.hiscore) : score,
    }
    localStorage.setItem('NeverendingNoodles', JSON.stringify(userState))
  }, [score])

  useEffect(() => {
    // this is going to be inactivity timer
    if (inactivityRef.current) clearTimeout(inactivityRef.current)
    if (score > 0) {
      inactivityRef.current = setTimeout(reset, INACTIVE_LIMIT)
    }
  }, [scrolling, score])

  useEffect(() => {
    const observer = new IntersectionObserver(onObserve(observe, dispatch, noodles, target, scene, timeout), OBSERVER_OPTIONS)
    if (target.current) {
      observer.observe(target.current)
    }
  }, [])
  return (
    <Fragment>
      <Score style={{ top: '40px' }}>{`HI Score: ${hiscore}`}</Score>
      <Score style={{ top: '60px' }}>{`Score: ${score}`}</Score>
      <Scene ref={scene}>
        <Noodles type={NOODLES.RICE} ref={noodles} />
        <Bowl noodles={NOODLES.RICE} shake={scrolling} />
      </Scene>
      <Target ref={target} />
    </Fragment>
  )
}

export default App
