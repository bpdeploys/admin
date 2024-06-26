import React, { useState } from 'react';
import styles from './creategomodal.module.scss';
import { createGeneralOverseer } from '../../../services';
import Modal from '../../Common/Modal';
import { useLoading } from '../../../utils/hooks/useLoading';
import Image from 'next/image';

const CreateGeneralOverseerModal = ({ showModal, toggleModal }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { isLoading, startLoading, stopLoading } = useLoading();

  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const generateRandomEmail = (firstName, lastName) => {
    const randomNumbers = Math.floor(10 + Math.random() * 90);
    return `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomNumbers}@bp.com`;
  };

  const handleCreateGeneralOverseer = async () => {
    startLoading();
    const password = generateRandomPassword();
    const email = generateRandomEmail(firstName, lastName);

    try {
      await createGeneralOverseer({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        type: 'GO',
        phone_number: phoneNumber,
      });
      alert('General Overseer created successfully');
      toggleModal();
    } catch (error) {
      alert('Error creating General Overseer');
    } finally {
      stopLoading();
    }
  };

  return (
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title="Create New General Overseer"
      width="30vw"
    >
      <div className={styles.container}>
        <input
          type="text"
          placeholder="First Name"
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
          onClick={handleCreateGeneralOverseer}
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
            'Create General Overseer'
          )}
        </button>
      </div>
    </Modal>
  );
};

export default CreateGeneralOverseerModal;
