import React, { useState, useEffect } from 'react';
import Modal from '../../Common/Modal';
import styles from './pitchesmodal.module.scss';
import GreenArrowButton from '../GreenArrowBtn';
import ButtonBox from '../../Common/ButtonBox';
import CreatePitchModal from '../CreatePitchModal';
import { getPitchesByVenue } from '../../../services';
import EditPitchModal from '../EditPitchModal';

const PitchesModal = ({
  showModal,
  toggleModal,
  selectedVenue,
  pitchesData,
  refetchPitches,
}) => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState(null);

  const toggleCreationModal = () => {
    setShowCreationModal(!showCreationModal);
  };

  const handlePitchCreate = () => {
    refetchPitches();
    toggleCreationModal();
  };

  const handlePitchEdit = () => {
    refetchPitches();
    setSelectedPitch(null);
  };

  return (
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title={`${pitchesData?.length || 0} PITCHES`}
      width="50%"
      hideActions={showCreationModal || selectedPitch}
    >
      <div className={styles.container}>
        {showCreationModal && (
          <CreatePitchModal
            showModal={showCreationModal}
            toggleModal={toggleCreationModal}
            selectedVenue={selectedVenue}
            onPitchCreated={handlePitchCreate}
          />
        )}
        {selectedPitch && (
          <EditPitchModal
            showModal={true}
            toggleModal={() => setSelectedPitch(null)}
            selectedPitch={selectedPitch}
            onPitchEdited={handlePitchEdit}
          />
        )}
        <GreenArrowButton
          text="Create New Pitch"
          onClick={() => toggleCreationModal()}
        />
        <div className={styles.boxes}>
          {pitchesData &&
            pitchesData.map((pitch, index) => (
              <ButtonBox
                key={index}
                title={pitch.name}
                action="Edit"
                onClick={() => setSelectedPitch(pitch)}
              />
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default PitchesModal;
