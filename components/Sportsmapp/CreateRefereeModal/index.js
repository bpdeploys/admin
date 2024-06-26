import React, { useState } from 'react';
import styles from './createrefereemodal.module.scss';
import TopModal from '../../Common/TopModal';
import { createReferee } from '../../../services';
import { useLoading } from '../../../utils/hooks/useLoading';
import Image from 'next/image';

const CreateRefereeModal = ({
  showModal,
  toggleModal,
  selectedVenue,
  onRefereeCreated,
}) => {
  const [logo, setLogo] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const generateRandomEmail = (firstName, lastName) => {
    const randomNumbers = Math.floor(10 + Math.random() * 90);
    return `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomNumbers}@bp.com`;
  };

  const handleCreateReferee = async () => {
    startLoading();

    const email = generateRandomEmail(firstName, lastName);

    try {
      await createReferee({
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        type: 'R',
        venue: selectedVenue,
      });
      alert('Referee created successfully');
      onRefereeCreated();
    } catch (error) {
      alert('Error creating referee');
    } finally {
      stopLoading();
    }
  };

  return (
    <TopModal
      show={showModal}
      modalClosed={toggleModal}
      title="Create New Referee"
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
          placeholder="Referee First Name"
          className={styles.inputField}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className={styles.inputField}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className={styles.inputField}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          className={styles.submitButton}
          onClick={handleCreateReferee}
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
            'Create Referee'
          )}
        </button>
      </div>
    </TopModal>
  );
};

export default CreateRefereeModal;
