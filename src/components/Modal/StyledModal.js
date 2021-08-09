import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.2s;
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background: white;
  max-width: 400px;
  width: 100%;
  padding: 30px 20px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -100vh);
  animation: modal linear 0.5s forwards;

  @keyframes modal {
    0% {
      transform: translate(-50%, -200vh);
    }
    80% {
      transform: translate(-50%, -40%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
`;

export const ModalImage = styled.img`
  width: 100px;
`;

export const ModalTitle = styled.h2`
  font-weight: 400;
`;

export const ModalText = styled.p`
  margin-top: 10px;
`;

export const RestartBtn = styled.button`
  all: unset;
  margin: 20px 10px 30px 10px;
  padding: 8px 20px;
  background: rgb(25, 203, 148);
  color: white;
  font-weight: 400;
  cursor: pointer;
  border-radius: 2px;
  &:hover {
    box-shadow: inset 0 0 10px 0 rgb(0, 0, 0, 0.2);
  }
`;

export const CancelBtn = styled(RestartBtn)`
  background: rgb(237, 94, 104);
`;
