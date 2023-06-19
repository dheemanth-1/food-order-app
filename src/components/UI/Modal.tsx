import { PropsWithChildren } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

interface ModalProps {
    onClose: () => void
}

const BackDrop = (props: ModalProps) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

const ModalOverLay = (props:PropsWithChildren) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const PortalElement = document.getElementById('overlays') as HTMLElement

const Modal = (props:PropsWithChildren<ModalProps>) => {
    return <>
    {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, PortalElement)}
    {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>, PortalElement)}
    </>
}

export default Modal;