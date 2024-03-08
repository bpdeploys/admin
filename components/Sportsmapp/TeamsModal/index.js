import React, { useState, useEffect } from 'react';
import Modal from '../../Common/Modal';
import styles from './teamsmodal.module.scss';
import GreenArrowButton from '../GreenArrowBtn';
import ButtonBox from '../../Common/ButtonBox';
import CreatePitchModal from '../CreatePitchModal';
import CreateTeamModal from '../CreateTeamModal';

const TeamsModal = ({
  showModal,
  toggleModal,
  selectedVenue,
  selectedLeague,
  selectedProvider,
  teamsData,
  refetchTeams,
}) => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const toggleCreationModal = () => {
    setShowCreationModal(!showCreationModal);
  };

  const handleTeamCreate = () => {
    refetchTeams();
    toggleCreationModal();
  };

  console.log('TEAMS DATA FROM MODAL', teamsData);

  return (
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title={`${teamsData?.length || 0} TEAMS`}
      width="50%"
      hideActions={showCreationModal || selectedTeam}
    >
      <div className={styles.container}>
        {showCreationModal && (
          <CreateTeamModal
            showModal={showCreationModal}
            toggleModal={toggleCreationModal}
            selectedVenue={selectedVenue}
            selectedLeague={selectedLeague}
            selectedProvider={selectedProvider}
            onTeamCreated={handleTeamCreate}
          />
        )}
        <GreenArrowButton
          text="Create New Team"
          onClick={() => toggleCreationModal()}
        />
        <div className={styles.boxes}>
          {teamsData &&
            teamsData.map((team, index) => (
              <ButtonBox key={index} title={team.team_name} />
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default TeamsModal;
