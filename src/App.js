import React, { Fragment, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { TweenMax } from 'gsap'
import Bowl from './bowl'
import styled from 'styled-components'
import NOODLES from './noodles'

const Score = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  font-weight: bold;
`

const Scene = styled.div`
  min-height: 100vh;
  position: relative;
`

const Noodles = styled.div`
  bottom: 50vh;
  position: absolute;
  left: 50%;
  height: 100px;
  width: 50px;
  margin-bottom: -50px;
  border-radius: 5px 0 0 0;
  transform: translate(-50%, 0);
  ${
    ({type: {thickness, colors}}) => `background: repeating-linear-gradient(90deg, ${colors[0]}, ${colors[0]} ${thickness}px, ${colors[1]} ${thickness}px, ${colors[1]} ${2 * thickness}px)`
  };

  &:before {
    content: '';
    width: 100px;
    height: 5px;
    background: #111;
    position: absolute;
    top: 0;
    left: 100%;
  }

  &:after {
    content: '';
    width: 150px;
    height: 5px;
    border-radius: 2px 0 0 2px;
    background: #111;
    position: absolute;
    left: 0;
    top: 2px;
    transform-origin: left center;
    transform: rotate(-15deg);
  }
`

const Target = styled.div`
  height: 10px;
`

const OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: [0, 0.25, 0.5, 0.75, 1.0],
}


const App = () => {
  const scene = useRef(null)
  const noodles = useRef(null)
  const target = useRef(null)
  const timeout = useRef(null)
  const [scrolling, setScrolling] = useState(false)
  const [scrolled, setScrolled] = useState(0)
  // const [noodleType, setNoodleType] = useState(NOODLES.RICE)
  const onObserve = entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && window.scrollY !== 0) {
        setScrolling(true)
        const newHeight =
          noodles.current.offsetHeight + target.current.offsetHeight
        TweenMax.to(scene.current, 0.1, {
          height: scene.current.offsetHeight + target.current.offsetHeight,
        })
        TweenMax.to(noodles.current, 0.1, {
          height: newHeight,
        })
        setScrolled(newHeight)
      } else {
        const resetBowl = () => {
          setScrolling(false)
          timeout.current = null
        }
        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(resetBowl, 500)
      }
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(onObserve, OBSERVER_OPTIONS)
    if (target.current) {
      observer.observe(target.current)
    }
  }, [])
  return (
    <Fragment>
      <Score>{`${scrolled}px 😋`}</Score>
      <Scene ref={scene}>
        <Noodles type={NOODLES.RICE} ref={noodles} />
        <Bowl noodles={NOODLES.RICE} shake={scrolling} />
      </Scene>
      <Target ref={target} />
    </Fragment>
  )
}

export default App
