import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import styles from './createpitchmodal.module.scss';
import TopModal from '../../Common/TopModal';

const CreatePitchModal = ({ showModal, toggleModal }) => {
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
    <TopModal
      show={showModal}
      modalClosed={toggleModal}
      title="Create New Pitch"
      zIndex={200}
      width="30vw"
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
            'Use Sports Provider Logo'
          )}
        </label>
        <input
          type="text"
          placeholder="Name of the Pitch"
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Pitch format"
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="What is the surface?"
          className={styles.inputField}
        />
        <button className={styles.submitButton}>Create Pitch</button>
      </div>
    </TopModal>
  );
};

export default CreatePitchModal;
