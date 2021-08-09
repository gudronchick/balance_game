import styled from "styled-components";

export const Field = styled.canvas`
  height: 550px;
  width: 550px;
  background: rgb(50, 49, 83);
  margin: 20px;
`;

export const Joystick = styled(Field)`
  height: 150px;
  width: 300px;
  background: transparent;
  margin: 0;
`;
