import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import styles from './venuesmodal.module.scss';

const VenuesModal = ({ showModal, toggleModal }) => {
  const [logo, setLogo] = useState(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal show={showModal} modalClosed={toggleModal} title="Create New Venue">
      <div className={styles.container}>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          style={{ display: 'none' }}
          id="logo-upload"
        />
        <label htmlFor="logo-upload" className={styles.logoButton}>
          {logo ? (
            <img src={logo} alt="Logo" className={styles.logoImage} />
          ) : (
            'Use Sports Provider Logo'
          )}
        </label>
        <input
          type="text"
          placeholder="Venue Name"
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Main Sport"
          className={styles.inputField}
        />
        <input type="text" placeholder="Region" className={styles.inputField} />
        <button className={styles.submitButton}>Create Venue</button>
      </div>
    </Modal>
  );
};

export default VenuesModal;
