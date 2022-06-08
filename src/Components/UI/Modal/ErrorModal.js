import React from "react";
import ReactDOM from "react-dom";
import Card from "../Card/Card";
import classes from "./ErrorModal.module.css";

const BackDrop = ({ onHideError }) => {
  return <div className={classes.backdrop} onClick={onHideError}></div>;
};

const ModalOverlay = ({ title, message, onHideError }) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        <p>{message}</p>
      </div>
      <footer className={classes.actions}>
        <button className={classes.button} onClick={onHideError}>
          Okay
        </button>
      </footer>
    </Card>
  );
};

function ErrorModal({ title, message, onHideError }) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onHideError={onHideError} />,
        document.getElementById("backdrop-error")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={title}
          message={message}
          onHideError={onHideError}
        />,
        document.getElementById("ErrorModalOverlay")
      )}
    </>
  );
}

export default ErrorModal;
