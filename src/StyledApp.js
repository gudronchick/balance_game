import styled from "styled-components";

export const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ isResized }) => (isResized ? "column" : "row")};
  height: 100vh;
  transform-style: preserve-3d;
  perspective: 1000px;

  @media only screen and (orientation: landscape) {
    & {
      flex-direction: row;
    }
  }
`;

export const DifficultyBtn = styled.button`
  all: unset;
  color: white;
  background: ${({ hard }) => (!hard ? "rgb(220, 50, 50)" : "rgb(5, 200, 5)")};
  text-align: center;
  padding: 7px 10px;
  width: 160px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, 0.4);
  }
  &:disabled {
    background: grey;
    cursor: not-allowed;
  }
`;

export const JoystickWrap = styled.div`
  text-align: center;
  position: relative;
`;

export const StartText = styled.p`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;
