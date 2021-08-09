import React from "react";
import * as s from "./StyledModal";
import img from "../../images/win.png";

const ModalComponent = (props) => {
  return (
    <s.ModalWrapper>
      <s.Modal>
        <s.ModalImage src={img}></s.ModalImage>
        <s.ModalTitle>Congragulations</s.ModalTitle>
        <s.ModalText>You won this game</s.ModalText>
        <s.RestartBtn onClick={props.restartTheGame}>Play again</s.RestartBtn>
        <s.CancelBtn onClick={props.cancelTheModal}>Cancel</s.CancelBtn>
      </s.Modal>
    </s.ModalWrapper>
  );
};

export default ModalComponent;
