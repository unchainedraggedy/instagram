import React from "react";
import styles from "../styles/Home.module.css";  

const Button = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={`${styles.uploadButton} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
