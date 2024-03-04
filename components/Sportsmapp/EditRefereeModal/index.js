import React, { useState, useEffect } from 'react';
import styles from './editrefereemodal.module.scss';
import TopModal from '../../Common/TopModal';
import { updateReferee } from '../../../services'; // Assuming you have an updateReferee function in your services

const EditRefereeModal = ({ showModal, toggleModal, selectedReferee }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Set initial values when selectedReferee changes
    if (selectedReferee) {
      setFirstName(selectedReferee.user.first_name);
      setLastName(selectedReferee.user.last_name);
      setPhoneNumber(selectedReferee.user.phone_number || '');
    }
  }, [selectedReferee]);

  const handleUpdateReferee = async () => {
    try {
      await updateReferee(selectedReferee.id, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      });
      alert('Referee updated successfully');
      toggleModal();
    } catch (error) {
      alert('Error updating referee:', error);
    }
  };

  return (
    <TopModal
      show={showModal}
      modalClosed={toggleModal}
      title="Edit Referee"
      zIndex={200}
      width="30vw"
    >
      <div className={styles.container}>
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
        <button className={styles.submitButton} onClick={handleUpdateReferee}>
          Update Referee
        </button>
      </div>
    </TopModal>
  );
};

export default EditRefereeModal;
