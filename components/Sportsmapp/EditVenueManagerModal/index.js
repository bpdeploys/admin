import React, { useState, useEffect } from 'react';
import styles from './editvmmodal.module.scss';
import TopModal from '../../Common/TopModal';
import { updateUser } from '../../../services';

const EditVenueManagerModal = ({
  showModal,
  toggleModal,
  selectedVm,
  onVmEdited,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Set initial values when selectedVm changes
    if (selectedVm) {
      setFirstName(selectedVm.user.first_name);
      setLastName(selectedVm.user.last_name);
      setPhoneNumber(selectedVm.user.phone_number || '');
    }
  }, [selectedVm]);

  const handleUpdateVenueManager = async () => {
    try {
      await updateUser(selectedVm.user.id, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      });
      alert('Venue Manager updated successfully');
      onVmEdited();
    } catch (error) {
      alert('Error updating VenueManager:', error);
    }
  };

  return (
    <TopModal
      show={showModal}
      modalClosed={toggleModal}
      title="Edit Venue Manager"
      zIndex={200}
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
          onClick={handleUpdateVenueManager}
        >
          Update VM
        </button>
      </div>
    </TopModal>
  );
};

export default EditVenueManagerModal;
