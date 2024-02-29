import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import styles from './leaguesmodal.module.scss';
import { createLeague } from '../../../services';

const LeaguesModal = ({ showModal, toggleModal, onLeagueCreated }) => {
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
    console.log('testr');
    try {
      const leagueData = {
        league_name: leagueName,
        league_format: leagueFormat,
        creation_date: creationDate,
        start_date: startDate,
        max_number_of_teams: maxNumberOfTeams,
        min_number_of_teams: minNumberOfTeams,
        season: season,
        postcode: postcode,
        status: status,
        match_day: matchDay,
        competition: competition,
        sport_entity: sportEntity,
        venue: venue,
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
      // Handle error here, display error message to the user
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
            type="date"
            placeholder="Creation Date"
            className={styles.inputField}
            value={creationDate}
            onChange={(e) => setCreationDate(e.target.value)}
          />
          <input
            type="date"
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
            placeholder="Season"
            className={styles.inputField}
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          />
          <input
            type="text"
            placeholder="Postcode"
            className={styles.inputField}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
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
            placeholder="Sport Entity"
            className={styles.inputField}
            value={sportEntity}
            onChange={(e) => setSportEntity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Venue"
            className={styles.inputField}
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
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
