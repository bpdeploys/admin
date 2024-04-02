import React, { useState, useEffect } from 'react';
import styles from './editpitchmodal.module.scss';
import TopModal from '../../Common/TopModal';
import { updatePitch, deletePitch } from '../../../services';
import { useLoading } from '../../../utils/hooks/useLoading';
import Image from 'next/image';

const EditPitchModal = ({
  showModal,
  toggleModal,
  selectedPitch,
  onPitchEdited,
}) => {
  const [name, setName] = useState('');
  const [format, setFormat] = useState('');
  const [surface, setSurface] = useState('');

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

  useEffect(() => {
    if (selectedPitch) {
      setName(selectedPitch.name);
      setFormat(selectedPitch.format_pitch);
      setSurface(selectedPitch.surface);
    }
  }, [selectedPitch]);

  const handleUpdatePitch = async () => {
    startUpdating();

    try {
      await updatePitch(selectedPitch.id, {
        name,
        format,
        surface,
      });
      alert('Pitch updated successfully');
      onPitchEdited();
      toggleModal();
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating the pitch');
    } finally {
      stopUpdating();
    }
  };

  const handleDeletePitch = async () => {
    startDeleting();

    const confirmDeletion = window.confirm(
      'Are you sure you want to delete this pitch?'
    );
    if (confirmDeletion) {
      try {
        await deletePitch(selectedPitch.id);
        alert('Pitch deleted successfully');
        onPitchEdited();
        toggleModal();
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the pitch');
      } finally {
        stopDeleting();
      }
    }
  };

  return (
    <TopModal
      show={showModal}
      modalClosed={toggleModal}
      title="Edit Pitch"
      zIndex={200}
      width="30vw"
    >
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Name of the Pitch"
          className={styles.inputField}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pitch format"
          className={styles.inputField}
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        />
        <input
          type="text"
          placeholder="What is the surface?"
          className={styles.inputField}
          value={surface}
          onChange={(e) => setSurface(e.target.value)}
        />
        <button
          className={styles.submitButton}
          onClick={handleUpdatePitch}
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
            'Update Pitch'
          )}
        </button>
        <button
          className={styles.deleteButton}
          onClick={handleDeletePitch}
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
            'Delete Pitch'
          )}
        </button>
      </div>
    </TopModal>
  );
};

export default EditPitchModal;
