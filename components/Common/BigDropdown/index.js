import React from 'react';
import styles from './bigdropdown.module.scss';

const BigDropdown = () => {
  return (
    <select className={styles.select}>
      <option selected value="0">
        Jan 2024
      </option>
      <option value="1">Feb 2024</option>
      <option value="2">Mar 2024</option>
      <option value="3">Apr 2024</option>
      <option value="4">May 2024</option>
    </select>
  );
};

export default BigDropdown;
