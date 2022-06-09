import * as ReactDOM from 'react-dom';
import React from 'react';
import styles from './modal.module.css'
import ModalOverlay from './../ModalOverlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'



const Modal = ({ title, onClose, onEscKeydown, children }) => {
    const modalRoot = document.getElementById("react-modals");
 
    React.useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);

        return () => {
            document.removeEventListener('keydown', onEscKeydown);
        };
    }, []);

    return ReactDOM.createPortal(
        (
            <>
                <div className={styles.model}>
                    <div className={`${styles.model__header_box} pt-10 pl-10 pr-10`}>
                        <h2 className='text text_type_main-medium'>{title}</h2>
                        <CloseIcon type="primary" onClick={onClose} />

                    </div>
                    {children}
                </div>

                < ModalOverlay onClick={onClose} />
            </>

        ),
        modalRoot
    );

}


export default Modal;