import React from 'react'
import styled, { css, keyframes } from 'styled-components'

const SHAKES = [
  [0, 0, 0],
  [1, 1, 0],
  [-1, -2, -1],
  [-3, 0, 1],
  [3, 2, 0],
  [1, -1, 1],
  [-1, 2, -1],
  [-3, 1, 0],
  [3, 1, -1],
  [-1, -1, 1],
  [1, 2, 0],
  [1, -2, -1],
  [0, 0, 0],
]
const shake = keyframes`
  ${SHAKES.map(
    (s, i) => `
    ${(i * 100) / SHAKES.length}% {
      transform: translate(-50%, 50%) translate(${s[0]}px, ${s[1]}px) rotate(${
      s[2]
    }deg);
    }
  `
  )}
`

const Bowl = styled.div`
  position: absolute;
  bottom: 5px;
  left: 50%;
  height: 75px;
  width: 150px;
  border-radius: 5px 5px 75px 75px;
  background: #fafafa;
  transform: translate(-50%, 0);
`

const getNoodleStyle = ({thickness, colors}) => {
  return `background: repeating-radial-gradient(${colors[1]}, ${colors[1]} ${thickness}px, ${colors[0]} ${thickness}px, ${colors[0]} ${thickness * 2}px);`
}

const Noodles = styled.div`
  border-radius: 100%;
  ${p => getNoodleStyle(p.noodles)};
  position: absolute;
  top: 0%;
  height: 100px;
  width: 100px;
  left: 50%;
  transform: translate(-50%, 0%);

  &:before,
  &:after {
    content: '';
    height: 100px;
    width: 100px;
    border-radius: 100%;
    position: absolute;
    ${p => getNoodleStyle(p.noodles)};
  }

  &:before {
    top: 25%;
    left 18%;
  }
  &:after {
    top: 30%;
    left: -18%;
  }
`
const Container = styled.div`
  height: 150px;
  width: 150px;
  position: absolute;
  bottom: 50vh;
  left: 50%;
  transform: translate(-50%, 50%);
  &:after {
    content: '';
    height: 25%;
    width: 50%;
    position: absolute;
    bottom: 0;
    background: #fafafa;
    left: 50%;
    transform: translate(-50%, 0);
  }
  ${p =>
    p.shake &&
    css`
      animation: ${shake} 0.1s infinite;
    `}
`

const Face = styled.div`
  position: absolute;
  height: 15px;
  width: 60px;
  top: 15%;
  left: 50%;
  transform: translate(-50%, 0);
`

const blink = keyframes`
  0%, 73%, 75%, 100% {
    transform: scaleY(1);
  }
  74% {
    transform: scaleY(0.1);
  }
`

const Eye = styled.div`
  background: ${p => p.straining ? 'transparent' : '#000'};
  border-radius: 100%;
  height: 15px;
  width: 15px;
  position: absolute;
  ${p => !p.straining && css`
    background: #000;
    animation: ${blink} 8s infinite linear;
    &:after,
    &:before {
      content: '';
      background: #fff;
      position: absolute;
      border-radius: 100%;
    }

    &:after {
      height: 30%;
      left: 20%;
      top: 15%;
      width: 30%;
    }

    &:before {
      height: 15%;
      left: 25%;
      top: 55%;
      width: 15%;
    }
  `}

  ${p => p.straining && `
    &:after,
    &:before {
      content: '';
      background: #000;
      border-radius: 0;
      height: 2px;
      left: 50%;
      position: absolute;
      top: 50%;
      transform-origin: right;
      width: 15px;
    }

    &:after {
      transform: translate(-50%, -50%) rotate(20deg);
    }

    &:before {
      transform: translate(-50%, -50%) rotate(-20deg);
    }

    &:nth-of-type(2) {
      transform: rotate(180deg);
    }
  `}

  &:nth-of-type(1) {
    left: 0;
  }

  &:nth-of-type(2) {
    right: 0;
  }
`

const Mouth = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 100%;
  position: absolute;
  background: #000;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  overflow: hidden;

  ${p => p.straining && `
    height: 5px;
    border-radius: 0;
    &:after {
      display: none;
    }
  `}

  &:after {
    content: '';
    border-radius: 100%;
    background: red;
    height: 5px;
    width: 5px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-100%, 0);
    box-shadow: 4px 2px 0 2px red;
  }

`

const steaming = keyframes`
  0% {
    opacity: 0.85;
    clip-path: polygon(100% -50%, 120% -50%, 120% 150%, 100% 150%);
  }
  100% {
    opacity: 0.85;
    clip-path: polygon(-20% -50%, 0 -50%, 0 150%, -20% 150%);
  }
`


const Steam = styled.div`
  position: absolute;
  top: ${p => p.top}px;
  left: ${p => p.left}px;
  color: transparent;
  font-size: 20px;
  text-decoration-line: overline;
  text-decoration-style: wavy;
  text-decoration-color: #fff;
  transform: rotate(90deg) scale(2);
  animation: ${steaming} 2s -${p => p.delay * 0.75}s infinite linear;
  `

const BowlComponent = ({ shake, noodles }) => (
  <Container shake={shake}>
    <Noodles noodles={noodles} />
    <Bowl>
      <Steam delay={1} top={-65} left={55}>------</Steam>
      <Steam delay={2} top={-90} left={20}>------</Steam>
      <Steam delay={3} top={-55} left={-5}>------</Steam>
      <Face>
        <Eye straining={shake}/>
        <Eye straining={shake}/>
        <Mouth straining={shake}/>
      </Face>
    </Bowl>
  </Container>
)

export default BowlComponent
