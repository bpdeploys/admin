import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import styles from './providermodal.module.scss';

const ProviderModal = ({ showModal, toggleModal }) => {
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
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title="Create New Provider"
    >
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
            'Add Logo'
          )}
        </label>
        <input
          type="text"
          placeholder="Sports Provider Name"
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Home Country"
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Address"
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Website"
          className={styles.inputField}
        />
        <button className={styles.submitButton}>Create Provider</button>
      </div>
    </Modal>
  );
};

export default ProviderModal;
