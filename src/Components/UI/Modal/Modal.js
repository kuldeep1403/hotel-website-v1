import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = ({ onHideCart }) => {
  return <div className={classes.backdrop} onClick={onHideCart}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

function Modal({ onHideCart, children }) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onHideCart={onHideCart} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById("ModalOverlay")
      )}
    </>
  );
}

export default Modal;
