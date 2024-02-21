import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import styles from './leaguesmodal.module.scss';

const LeaguesModal = ({ showModal, toggleModal }) => {
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
    <Modal show={showModal} modalClosed={toggleModal} title="Create New League">
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
            'League Logo'
          )}
        </label>
        <input
          type="text"
          placeholder="League Name"
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Placeholder"
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Placeholder"
          className={styles.inputField}
        />
        <button className={styles.submitButton}>Create League</button>
      </div>
    </Modal>
  );
};

export default LeaguesModal;
