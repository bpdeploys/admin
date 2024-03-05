import React, { useState, useEffect } from 'react';
import Modal from '../../Common/Modal';
import styles from './refereesmodal.module.scss';
import GreenArrowButton from '../GreenArrowBtn';
import ButtonBox from '../../Common/ButtonBox';
import CreateRefereeModal from '../CreateRefereeModal';
import { getRefereesByVenue } from '../../../services';
import EditRefereeModal from '../EditRefereeModal';

const RefereesModal = ({
  showModal,
  toggleModal,
  selectedVenue,
  refereesData,
  refetchReferees,
}) => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState(null);

  const toggleCreationModal = () => {
    setShowCreationModal(!showCreationModal);
  };

  const handleRefereeCreate = () => {
    refetchReferees();
    toggleCreationModal();
  };

  const handleRefereeEdit = () => {
    refetchReferees();
    setSelectedReferee(null);
  };

  return (
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title={`${refereesData?.length || 0} REFEREES`}
      width="50%"
      hideActions={showCreationModal || selectedReferee}
    >
      <div className={styles.container}>
        {showCreationModal && (
          <CreateRefereeModal
            showModal={showCreationModal}
            toggleModal={toggleCreationModal}
            selectedVenue={selectedVenue}
            onRefereeCreated={handleRefereeCreate}
          />
        )}
        {selectedReferee && (
          <EditRefereeModal
            showModal={true}
            toggleModal={() => setSelectedReferee(null)}
            selectedReferee={selectedReferee}
            onRefereeEdited={handleRefereeEdit}
          />
        )}
        <GreenArrowButton
          text="Create New Referee"
          onClick={() => toggleCreationModal()}
        />
        <div className={styles.boxes}>
          {refereesData &&
            refereesData.map((referee, index) => (
              <ButtonBox
                key={index}
                title={`${referee.user.first_name} ${referee.user.last_name}`}
                action="Edit"
                onClick={() => setSelectedReferee(referee)}
              />
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default RefereesModal;
