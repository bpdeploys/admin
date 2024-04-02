import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import { createVenue } from '../../../services';
import styles from './venuesmodal.module.scss';
import { useLoading } from '../../../utils/hooks/useLoading';
import Image from 'next/image';

const VenuesModal = ({
  showModal,
  toggleModal,
  selectedProvider,
  onVenueCreated,
}) => {
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState('');
  const [mainSport, setMainSport] = useState('');
  const [region, setRegion] = useState('');

  const { isLoading, startLoading, stopLoading } = useLoading();

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
    startLoading();
    try {
      const venue = {
        name,
        postcode1: 1,
        postcode2: '5TL',
        sport_entity: selectedProvider,
      };

      await createVenue(venue);
      onVenueCreated(); // Call the function to handle venue creation success
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Main Sport"
          className={styles.inputField}
          value={mainSport}
          onChange={(e) => setMainSport(e.target.value)}
        />
        <input
          type="text"
          placeholder="Region"
          className={styles.inputField}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Postcode 1"
          className={styles.inputField}
          value={postcode1}
          onChange={(e) => setPostcode1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Postcode 2"
          className={styles.inputField}
          value={postcode2}
          onChange={(e) => setPostcode2(e.target.value)}
        /> */}
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Image
              src="/assets/imgs/svgs/LoadingIcon.svg"
              alt="Loading"
              width={16}
              height={16}
            />
          ) : (
            'Create Venue'
          )}
        </button>
      </div>
    </Modal>
  );
};

export default VenuesModal;
