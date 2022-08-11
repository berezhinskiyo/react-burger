
import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css'
import ModalOverlay from '../ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';



const modalRoot = document.getElementById("react-modals");
const Modal = ({ title, children }) => {
    const navigate = useNavigate();
    const handleEscKeydown = (e) => {
        e.key === "Escape" && closeModal();
    };

    const closeModal = () => {
        navigate(-1);
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
                        <CloseIcon type="primary" onClick={closeModal} />

                    </div>
                    {children}
                </div>

                < ModalOverlay onClick={closeModal} />
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