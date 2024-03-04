import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import { createProvider } from '../../../services';
import styles from './providermodal.module.scss';

const ProviderModal = ({ showModal, toggleModal, onProviderCreated }) => {
  // Accept onProviderCreated prop
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');

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

  const handleSubmit = async () => {
    try {
      // Create the provider object
      const provider = {
        name,
        type: 'League Provider',
        service: 'Paid2',
        // country,
        // address,
        // website,
        // logo
      };

      await createProvider(provider);
      onProviderCreated();
    } catch (error) {
      console.error(error);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Home Country"
          className={styles.inputField}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className={styles.inputField}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Website"
          className={styles.inputField}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleSubmit}>
          Create Provider
        </button>
      </div>
    </Modal>
  );
};

export default ProviderModal;
