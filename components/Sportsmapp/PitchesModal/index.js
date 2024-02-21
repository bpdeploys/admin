import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import styles from './pitchesmodal.module.scss';
import GreenArrowButton from '../GreenArrowBtn';
import ButtonBox from '../../Common/ButtonBox';
import CreatePitchModal from '../CreatePitchModal';
import TopModal from '../../Common/TopModal';

const PitchesModal = ({ showModal, toggleModal }) => {
  const [showCreationModal, setShowCreationModal] = useState(false);

  const toggleCreationModal = () => {
    setShowCreationModal(!showCreationModal);
  };

  const pitchBoxesData = [
    {
      name: 'Emirates',
      pitchType: '7-aside',
      surfaceType: '',
      action: 'Edit',
      onClick: () => {},
    },
    {
      name: 'Bernabeu',
      pitchType: '6-aside',
      surfaceType: '4G',
      action: 'Edit',
      onClick: () => {},
    },
    {
      name: 'Etihad',
      pitchType: '6-aside',
      surfaceType: '3G',
      action: 'Edit',
      onClick: () => {},
    },
    {
      name: 'Anfield',
      pitchType: '5-aside',
      surfaceType: '',
      action: 'Edit',
      onClick: () => {},
    },
  ];

  return (
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title="4 PITCHES"
      width="50%"
      hideActions={showCreationModal}
    >
      <div className={styles.container}>
        {showCreationModal && (
          <CreatePitchModal
            showModal={showCreationModal}
            toggleModal={toggleCreationModal}
          />
        )}
        <GreenArrowButton
          text="Create New Pitch"
          onClick={() => toggleCreationModal()}
        />
        <div className={styles.boxes}>
          {pitchBoxesData.map((box, index) => (
            <ButtonBox
              key={index}
              title={box.name}
              action={box.action}
              onClick={box.onClick}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default PitchesModal;
