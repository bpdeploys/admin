import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import styles from './refereesmodal.module.scss';
import GreenArrowButton from '../GreenArrowBtn';
import ButtonBox from '../../Common/ButtonBox';
import LeaguesModal from '../LeaguesModal';
import CreateRefereeModal from '../CreateRefereeModal';

const RefereesModal = ({ showModal, toggleModal }) => {
  const [showCreationModal, setShowCreationModal] = useState(false);

  const toggleCreationModal = () => {
    setShowCreationModal(!showCreationModal);
  };

  const refereeBoxesData = [
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
    {
      name: 'Andres Carrasco',
      action: 'Edit',
      onClick: () => {},
    },
  ];

  return (
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title="5 REFEREES"
      width="50%"
      hideActions={showCreationModal}
    >
      <div className={styles.container}>
        {showCreationModal && (
          <CreateRefereeModal
            showModal={showCreationModal}
            toggleModal={toggleCreationModal}
          />
        )}
        <GreenArrowButton
          text="Create New Referee"
          onClick={() => toggleCreationModal()}
        />
        <div className={styles.boxes}>
          {refereeBoxesData.map((box, index) => (
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

export default RefereesModal;
