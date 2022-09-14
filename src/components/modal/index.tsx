
import ReactDOM from 'react-dom';
import React, { FC, MouseEventHandler, ReactNode } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'




const modalRoot = document.getElementById("react-modals")!;
const Modal: FC<{title: string; onCloseModal: () => void,children: ReactNode}> = ({ title, onCloseModal, children }) => {

    const handleEscKeydown = (e: KeyboardEvent) => {
        e.key === "Escape" && onCloseModal();
    };



    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);

        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        };
    }, [handleEscKeydown]);

    return ReactDOM.createPortal(
        (
            <>
                <div className={styles.model}>
                    <div className={`${styles.model__header_box} pt-10 pl-10 pr-10`}>
                        <h2 className='text text_type_main-medium'>{title}</h2>
                        <CloseIcon type="primary" onClick={onCloseModal} />

                    </div>
                    {children}
                </div>

                < ModalOverlay onClick={onCloseModal} />
            </>

        ),
        modalRoot
    );

}
Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default Modal;