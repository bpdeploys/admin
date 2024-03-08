import React from 'react';
import Image from 'next/image';
import styles from './greenarrowbtn.module.scss';

/**
 * Button component that triggers the creation of a new league.
 *
 * @param {Function} onClick - Function to call when button is clicked.
 * @param {string} text - The text to display on the button.
 */
const GreenArrowButton = ({ onClick, text }) => {
  return (
    <button className={styles.greenArrowButton} onClick={onClick}>
      {text}
      <span className={styles.icon}>
        <Image
          src="/assets/imgs/svgs/whiteArrowRight.svg"
          alt="Arrow icon"
          width={20}
          height={20}
        />
      </span>
    </button>
  );
};

export default GreenArrowButton;
