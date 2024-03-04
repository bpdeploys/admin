import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import { createLeague } from '../../../services';
import styles from './leaguesmodal.module.scss';

const LeaguesModal = ({
  showModal,
  toggleModal,
  onLeagueCreated,
  selectedVenue,
  selectedProvider,
}) => {
  const [logo, setLogo] = useState(null);
  const [leagueName, setLeagueName] = useState('');
  const [leagueFormat, setLeagueFormat] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [maxNumberOfTeams, setMaxNumberOfTeams] = useState('');
  const [minNumberOfTeams, setMinNumberOfTeams] = useState('');
  const [season, setSeason] = useState('');
  const [postcode, setPostcode] = useState('');
  const [status, setStatus] = useState('');
  const [matchDay, setMatchDay] = useState('');
  const [competition, setCompetition] = useState('');
  const [sportEntity, setSportEntity] = useState('');
  const [venue, setVenue] = useState('');
  const [sport, setSport] = useState('');

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Format creation date to YYYY-MM-DD format
    const formattedCreationDate = new Date().toISOString().split('T')[0];

    // Format start date to YYYY-MM-DD HH:MM:SS format
    const formattedStartDate = new Date(startDate).toISOString();

    try {
      const leagueData = {
        league_name: leagueName,
        league_format: leagueFormat,
        creation_date: formattedCreationDate,
        start_date: formattedStartDate,
        max_number_of_teams: maxNumberOfTeams,
        min_number_of_teams: minNumberOfTeams,
        season: season,
        postcode: postcode,
        status: status,
        match_day: matchDay,
        competition: competition,
        sport_entity: selectedProvider,
        venue: selectedVenue,
        sport: sport,
      };
      // Call createLeague function to create the league
      await createLeague(leagueData);
      // If league creation is successful, close the modal and trigger callback to refetch leagues
      toggleModal();
      if (onLeagueCreated) {
        onLeagueCreated();
      }
    } catch (error) {
      console.error('Error creating league:', error);
    }
  };

  return (
    <Modal show={showModal} modalClosed={toggleModal} title="Create New League">
      <div className={styles.container}>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          style={{ display: 'none' }}
          id="logo-upload"
        />
        <label htmlFor="logo-upload" className={styles.logoButton}>
          {logo ? (
            <img src={logo} alt="Logo" className={styles.logoImage} />
          ) : (
            'League Logo'
          )}
        </label>
        <div>
          <input
            type="text"
            placeholder="League Name"
            className={styles.inputField}
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
          <input
            type="text"
            placeholder="League Format"
            className={styles.inputField}
            value={leagueFormat}
            onChange={(e) => setLeagueFormat(e.target.value)}
          />
          <input
            type="datetime-local"
            placeholder="Start Date"
            className={styles.inputField}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Number of Teams"
            className={styles.inputField}
            value={maxNumberOfTeams}
            onChange={(e) => setMaxNumberOfTeams(e.target.value)}
          />
          <input
            type="number"
            placeholder="Min Number of Teams"
            className={styles.inputField}
            value={minNumberOfTeams}
            onChange={(e) => setMinNumberOfTeams(e.target.value)}
          />
          <input
            type="text"
            placeholder="Status"
            className={styles.inputField}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <input
            type="text"
            placeholder="Match Day"
            className={styles.inputField}
            value={matchDay}
            onChange={(e) => setMatchDay(e.target.value)}
          />
          <input
            type="text"
            placeholder="Competition"
            className={styles.inputField}
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sport"
            className={styles.inputField}
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          />
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          Create League
        </button>
      </div>
    </Modal>
  );
};

export default LeaguesModal;
