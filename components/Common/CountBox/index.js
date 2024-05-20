import React from 'react';
import styles from './countbox.module.scss';
import Image from 'next/image';

const CountBox = ({ onClick, title, count }) => {
  return (
    <div className={styles.box} onClick={onClick}>
      <h3>{title}</h3>
      <span className={styles.count}>{count}</span>
    </div>
  );
};

export default CountBox;
