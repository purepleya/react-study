import classes from './Modal.module.css';

function Modal({ children }) {
  return (
    <>
      <div className={classes.backdrop} />
      <dialog open className={classes.backdrop} >
        {children}
      </dialog>
    </>
  );
}

export default Modal;