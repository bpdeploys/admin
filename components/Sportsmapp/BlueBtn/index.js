import React from 'react';
import styles from './bluebtn.module.scss';

/**
 * Button component that triggers the creation of a new league.
 *
 * @param {Function} onClick - Function to call when button is clicked.
 */
const BlueButton = ({ onClick, text }) => {
  return (
    <button className={styles.blueButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default BlueButton;
