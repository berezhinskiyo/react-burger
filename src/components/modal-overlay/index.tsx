import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';
import { FunctionComponent, MouseEventHandler } from 'react';

  
const ModalOverlay:FunctionComponent<{onClick: MouseEventHandler}> = ({ onClick }) => {
    return (
        <div className={styles.overlay} onClick={onClick} />
    );
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
  }
  

export default ModalOverlay;