import React from 'react';
import styles from './buttonbox.module.scss';
import BreadcrumbDivider from '../BreadcrumbDivider';

const ButtonBox = ({ onClick, title, quantity, action }) => {
  return (
    <div className={styles.box} onClick={onClick}>
      <div className={styles.details}>
        <h4>{title}</h4>
        {quantity && (
          <div>
            <BreadcrumbDivider />
            <span>{quantity}</span>
          </div>
        )}
      </div>
      <button className={styles.action}>{action}</button>
    </div>
  );
};

export default ButtonBox;
