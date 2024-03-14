import React from 'react';
import Image from 'next/image';
import styles from './deletebtn.module.scss';

/**
 * Button component that triggers the creation of a new league.
 *
 * @param {Function} onClick - Function to call when button is clicked.
 * @param {string} text - The text to display on the button.
 */
const DeleteButton = ({ onClick, text }) => {
  return (
    <button className={styles.deleteButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default DeleteButton;
