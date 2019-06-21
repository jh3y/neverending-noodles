import styled from 'styled-components'
const Noodles = styled.div`
  bottom: 50vh;
  position: absolute;
  left: 50%;
  height: 100px;
  width: 50px;
  margin-bottom: -50px;
  border-radius: 5px 0 0 0;
  transform: translate(-50%, 0);
  ${({ type: { thickness, colors } }) =>
    `background: repeating-linear-gradient(90deg, ${colors[0]}, ${
      colors[0]
    } ${thickness}px, ${colors[1]} ${thickness}px, ${colors[1]} ${2 *
      thickness}px)`};

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
export default Noodles