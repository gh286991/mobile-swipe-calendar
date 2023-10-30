import React from "react";
import style from "./style.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <div className={style.modalHeader}>
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className={style.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
