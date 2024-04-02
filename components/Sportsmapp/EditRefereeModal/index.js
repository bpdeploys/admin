import React, { useState, useEffect } from 'react';
import styles from './editrefereemodal.module.scss';
import TopModal from '../../Common/TopModal';
import { deleteReferee, updateUser } from '../../../services';
import { useLoading } from '../../../utils/hooks/useLoading';
import Image from 'next/image';

const EditRefereeModal = ({
  showModal,
  toggleModal,
  selectedReferee,
  onRefereeEdited,
}) => {
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

  const handleUpdateReferee = async () => {
    startUpdating();
    try {
      await updateUser(selectedReferee.user.id, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      });
      alert('Referee updated successfully');
      onRefereeEdited();
    } catch (error) {
      alert('Error updating referee');
    } finally {
      stopUpdating();
    }
  };

  const handleDeleteReferee = async () => {
    const confirmDeletion = window.confirm(
      'Are you sure you want to delete this referee?'
    );
    if (confirmDeletion) {
      try {
        startDeleting();
        await deleteReferee(selectedReferee.id);
        alert('Referee deleted successfully');
        onRefereeEdited();
        toggleModal();
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the referee');
      } finally {
        stopDeleting();
      }
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
        <button
          className={styles.submitButton}
          onClick={handleUpdateReferee}
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
            'Update Referee'
          )}
        </button>
        <button
          className={styles.deleteButton}
          onClick={handleDeleteReferee}
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
            'Delete Referee'
          )}
        </button>
      </div>
    </TopModal>
  );
};

export default EditRefereeModal;
