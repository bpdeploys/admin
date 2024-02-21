import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import styles from './venuesmodal.module.scss';
import GreenArrowButton from '../GreenArrowBtn';
import ButtonBox from '../../Common/ButtonBox';
import CreateVenueManagerModal from '../CreateVenueManagerModal';

const VenuesManagerModal = ({ showModal, toggleModal }) => {
  const [showCreationModal, setShowCreationModal] = useState(false);

  const toggleCreationModal = () => {
    setShowCreationModal(!showCreationModal);
  };

  const venuesManagerBoxesData = [
    {
      name: 'Mark Conham',
      action: 'Edit',
      onClick: () => {},
    },
    {
      name: 'Dan Bohen',
      action: 'Edit',
      onClick: () => {},
    },
    {
      name: 'Merit Maqsut',
      action: 'Edit',
      onClick: () => {},
    },
    {
      name: 'Gail Contrera',
      action: 'Edit',
      onClick: () => {},
    },
  ];

  return (
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title="4 Venue Managers"
      width="50%"
      hideActions={showCreationModal}
    >
      <div className={styles.container}>
        {showCreationModal && (
          <CreateVenueManagerModal
            showModal={showCreationModal}
            toggleModal={toggleCreationModal}
          />
        )}
        <GreenArrowButton
          text="Create New VM"
          onClick={() => toggleCreationModal()}
        />
        <div className={styles.boxes}>
          {venuesManagerBoxesData.map((box, index) => (
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

export default VenuesManagerModal;
