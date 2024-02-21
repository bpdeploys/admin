import React, { memo } from 'react';
import styles from './modal.module.scss'; // Import the SCSS module
import Backdrop from '../Backdrop';
import Image from 'next/image';

/**
 * Modal Component
 *
 * Displays a dialog box with a backdrop. The dialog visibility is controlled by the `show` prop.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.show - Determines if the modal should be displayed
 * @param {Function} [props.modalClosed] - Function called when the backdrop is clicked
 * @param {React.ReactNode} props.children - Content displayed inside the modal
 * @param {string} [props.width='85%'] - Width of the modal
 * @param {string} [props.height=''] - Height of the modal
 * @param {string} [props.zIndex=''] - Index of the modal
 */
const Modal = memo(
  ({
    show,
    title,
    modalClosed = () => {},
    children,
    width = '30%',
    height = '',
    zIndex,
    hideActions = false,
  }) => {
    const modalClasses = [styles.modal];
    if (show) {
      modalClasses.push(styles.show);
    }

    return (
      <div>
        <Backdrop show={show} clicked={modalClosed} zIndex={zIndex} />
        <div
          className={modalClasses.join(' ')}
          style={{ width, height, zIndex }}
        >
          <div className={styles.modalInfo}>
            {!hideActions && (
              <>
                <Image
                  className={styles.close}
                  src="/assets/imgs/svgs/closeModal.svg"
                  width={20}
                  height={20}
                  onClick={modalClosed}
                />
                <h3>{title}</h3>
              </>
            )}
            <div>{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default Modal;
