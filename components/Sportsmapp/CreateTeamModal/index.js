import React, { useState } from 'react';
import styles from './createteammodal.module.scss';
import TopModal from '../../Common/TopModal';
import { createTeam } from '../../../services';

const CreateTeamModal = ({
  showModal,
  toggleModal,
  selectedVenue,
  selectedLeague,
  selectedProvider,
  onTeamCreated,
}) => {
  const [name, setName] = useState('');

  const handleCreateTeam = async () => {
    try {
      await createTeam({
        team_name: name,
        league: selectedLeague,
        venue: selectedVenue,
        sport_entity: selectedProvider,
        sport: 'Football',
        kit: true,
        number: true,
      });
      alert('Team created successfully');
      onTeamCreated();
    } catch (error) {
      alert('Error creating pitch');
    }
  };

  return (
    <TopModal
      show={showModal}
      modalClosed={toggleModal}
      title="Create New Team"
      zIndex={200}
      width="30vw"
    >
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Team Name"
          className={styles.inputField}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleCreateTeam}>
          Create Team
        </button>
      </div>
    </TopModal>
  );
};

export default CreateTeamModal;
