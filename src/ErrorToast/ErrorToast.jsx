import React from "react";
import styles from "./index.module.scss";

const ErrorToast = ({ message, onClose }) => {
  return (
    <div className={styles.errorToast}>
      <div className={styles.errorToastMessage}>{message}</div>
      <div className={styles.closeButton} onClick={onClose}>
        &times;
      </div>
    </div>
  );
};

export default ErrorToast;
