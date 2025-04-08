import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './Modal.module.scss';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className={styles['modal__overlay']}>
      <div className={styles['modal__window']} onClick={(e) => e.stopPropagation()}>
        <button className={`${styles['modal__close-button']} btn-reset`} onClick={onClose}>
          <FaTimes />
        </button>
        <button className={`${styles['modal__close-button--mobile']} btn-reset`} onClick={onClose}>
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
