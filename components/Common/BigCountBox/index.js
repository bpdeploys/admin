import React from 'react';
import styles from './countbox.module.scss';

const BigCountBox = ({ onClick, title, count, detail }) => {
  return (
    <div className={styles.boxWrapper}>
      <div className={styles.box} onClick={onClick}>
        <span className={styles.count}>{count}</span>
        <h3>{title}</h3>
      </div>
      {detail && <span>{detail}</span>}
    </div>
  );
};

export default BigCountBox;
