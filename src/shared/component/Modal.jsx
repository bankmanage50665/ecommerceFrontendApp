import "./Modal.css";
import ReactDOM from "react-dom";
import { CSStransition } from "react-transition-group";

import Backdrop from "./Backdrop";



const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>

        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}

      <CSStransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        className="modal"
      >
        <ModalOverlay {...props} />
      </CSStransition>
    </>
  );
};

export default Modal;
