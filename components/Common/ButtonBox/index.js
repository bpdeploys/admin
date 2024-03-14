import React from 'react';
import styles from './buttonbox.module.scss';
import BreadcrumbDivider from '../BreadcrumbDivider';

/**
 * Render a button box component with specified onClick, onDelete, title, quantity, and action.
 *
 * @param {function} onClick - The function to be called when the box is clicked
 * @param {string} title - The title to be displayed in the box
 * @param {number} quantity - The quantity to be displayed in the box
 * @param {string} action - The action to be displayed as a button in the box
 * @return {JSX.Element} The rendered button box component
 */
const ButtonBox = ({ onClick, title, quantity, action }) => {
  return (
    <div className={styles.box}>
      <div className={styles.details}>
        <h4>{title}</h4>
        {quantity && (
          <div>
            <BreadcrumbDivider />
            <span>{quantity}</span>
          </div>
        )}
      </div>
      <div className={styles.actions}>
        {action && (
          <button className={styles.action} onClick={onClick}>
            {action}
          </button>
        )}
      </div>
    </div>
  );
};

export default ButtonBox;
