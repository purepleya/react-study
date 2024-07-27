import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
	const dialogRef = useRef();

	useImperativeHandle(ref, () => {
		return {
			open() {
				dialogRef.current.showModal();
			}
		}
	});
	
	return createPortal(
		<dialog ref={dialogRef}>
			{children}
			<form method="dialog">
				<button>{buttonCaption}</button>
			</form>
		</dialog>,
		document.getElementById('modal-root'));
});


export default Modal;