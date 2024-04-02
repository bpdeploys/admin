import React, { useState, useEffect } from 'react';
import styles from './editvmmodal.module.scss';
import TopModal from '../../Common/TopModal';
import { deleteVm, updateUser } from '../../../services';
import { useLoading } from '../../../utils/hooks/useLoading';
import Image from 'next/image';

/**
 * EditVenueManagerModal component for editing venue manager details.
 *
 * @param {Object} showModal - Boolean to show or hide the modal
 * @param {Function} toggleModal - Function to toggle the modal visibility
 * @param {String} selectedVm - The selected venue manager object
 * @param {Function} onVmEdited - Function to handle the venue manager edited event
 * @return {JSX.Element} The modal component for editing venue manager details
 */
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

  const {
    isLoading: isUpdating,
    startLoading: startUpdating,
    stopLoading: stopUpdating,
  } = useLoading();
  const {
    isLoading: isDeleting,
    startLoading: startDeleting,
    stopLoading: stopDeleting,
  } = useLoading();

  const handleUpdateVenueManager = async () => {
    startUpdating();
    try {
      await updateUser(selectedVm.user.id, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      });
      alert('Venue Manager updated successfully');
      onVmEdited();
    } catch (error) {
      alert('Error updating VenueManager');
    } finally {
      stopUpdating();
    }
  };

  const handleDeleteVenueManager = async () => {
    const confirmDeletion = window.confirm(
      'Are you sure you want to delete this VM?'
    );
    if (confirmDeletion) {
      startDeleting();
      try {
        await deleteVm(selectedVm.id);
        alert('Venue Manager deleted successfully');
        onVmEdited();
        toggleModal();
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the venue manager');
      } finally {
        stopDeleting();
      }
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
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Image
              src="/assets/imgs/svgs/LoadingIcon.svg"
              alt="Loading"
              width={16}
              height={16}
            />
          ) : (
            'Update VM'
          )}
        </button>
        <button
          className={styles.deleteButton}
          onClick={handleDeleteVenueManager}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Image
              src="/assets/imgs/svgs/LoadingIcon.svg"
              alt="Loading"
              width={16}
              height={16}
            />
          ) : (
            'Delete VM'
          )}
        </button>
      </div>
    </TopModal>
  );
};

export default EditVenueManagerModal;
