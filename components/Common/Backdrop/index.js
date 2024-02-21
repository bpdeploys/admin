import React from 'react';
import styles from './backdrop.module.scss';

/**
 * Backdrop Component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.show - Controls the visibility of the backdrop
 * @param {Function} props.clicked - Function to call when the backdrop is clicked
 * @param {string} [props.zIndex='100'] - CSS z-index value for the backdrop
 */
const Backdrop = ({ show, clicked, zIndex = '100' }) => {
  const containerClasses = [styles.backdropContainer];
  if (show) {
    containerClasses.push(styles.show);
  }

  return (
    <div className={containerClasses.join(' ')}>
      <div
        className={styles.backdropOverlay}
        onClick={clicked}
        style={{ zIndex }}
      />
    </div>
  );
};

export default Backdrop;
