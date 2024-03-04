import React, { useState, useEffect } from 'react';
import Modal from '../../Common/Modal';
import styles from './refereesmodal.module.scss';
import GreenArrowButton from '../GreenArrowBtn';
import ButtonBox from '../../Common/ButtonBox';
import CreateRefereeModal from '../CreateRefereeModal';
import { getRefereesByVenue } from '../../../services';
import EditRefereeModal from '../EditRefereeModal';

const RefereesModal = ({ showModal, toggleModal, selectedVenue }) => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState(null);
  const [refereesData, setRefereesData] = useState([]);

  const toggleCreationModal = () => {
    setShowCreationModal(!showCreationModal);
  };

  useEffect(() => {
    const fetchReferees = async () => {
      try {
        const data = await getRefereesByVenue(selectedVenue);
        setRefereesData(data.results);
      } catch (error) {
        console.error('Error fetching referees:', error);
      }
    };

    if (showModal) {
      fetchReferees();
    }
  }, [showModal, selectedVenue]);

  return (
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title={`${refereesData.length} REFEREES`}
      width="50%"
      hideActions={showCreationModal || selectedReferee}
    >
      <div className={styles.container}>
        {showCreationModal && (
          <CreateRefereeModal
            showModal={showCreationModal}
            toggleModal={toggleCreationModal}
            selectedVenue={selectedVenue}
          />
        )}
        {selectedReferee && (
          <EditRefereeModal
            showModal={true}
            toggleModal={() => setSelectedReferee(null)}
            selectedReferee={selectedReferee}
          />
        )}
        <GreenArrowButton
          text="Create New Referee"
          onClick={() => toggleCreationModal()}
        />
        <div className={styles.boxes}>
          {refereesData.map((referee, index) => (
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
