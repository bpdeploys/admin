import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import { createLeague } from '../../../services';
import styles from './leaguesmodal.module.scss';
import constants from '../../../utils/data/constants';
import Dropdown from '../../Common/Dropdown';

/**
 * Renders a modal to create a new league
 *
 * @param {Object} showModal - boolean to show or hide the modal
 * @param {Function} toggleModal - function to toggle the modal visibility
 * @param {Function} onLeagueCreated - callback function triggered when a league is created
 * @param {Object} selectedVenue - selected venue for the league
 * @param {Object} selectedProvider - selected provider for the league
 * @return {JSX.Element} The modal to create a new league
 */
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
  const [gender, setGender] = useState('');
  const [playOffs, setPlayOffs] = useState('');
  const [championLeague, setChampionLeague] = useState('');
  const [startDate, setStartDate] = useState('');
  const [maxNumberOfTeams, setMaxNumberOfTeams] = useState('');
  const [minNumberOfTeams, setMinNumberOfTeams] = useState('');
  const [status, setStatus] = useState('');
  const [matchDay, setMatchDay] = useState('');
  const [competition, setCompetition] = useState('');
  const [sport, setSport] = useState('');
  const [dateInputType, setDateInputType] = useState('text');

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

  const handleDateFocus = () => setDateInputType('date');
  const handleDateBlur = () => !startDate && setDateInputType('text');

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
        gender,
        champions_league: championLeague,
        playoffs: playOffs,
        start_date: formattedStartDate,
        max_number_of_teams: maxNumberOfTeams,
        min_number_of_teams: minNumberOfTeams,
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
      console.error('Error creating league');
    }
  };

  const handleMaxTeamsChange = (e) => {
    setMaxNumberOfTeams(e.target.value);
  };

  const handleMaxTeamsBlur = () => {
    if (maxNumberOfTeams !== '') {
      const value = Math.max(6, Math.min(22, Number(maxNumberOfTeams)));
      setMaxNumberOfTeams(String(value));
    }
  };

  const handleMinTeamsChange = (e) => {
    setMinNumberOfTeams(e.target.value);
  };

  const handleMinTeamsBlur = () => {
    if (minNumberOfTeams !== '') {
      const value = Math.max(5, Math.min(21, Number(minNumberOfTeams)));
      setMinNumberOfTeams(String(value));
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
        <div className={styles.inputs}>
          <input
            type="text"
            placeholder="League Name"
            className={styles.inputField}
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
          <Dropdown
            className={styles.dropdown}
            value={leagueFormat}
            onChange={(e) => setLeagueFormat(e.target.value)}
            items={constants.LEAGUE_FORMATS}
            placeholder="League Format"
          />
          <input
            type={dateInputType}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
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
            onChange={handleMaxTeamsChange}
            onBlur={handleMaxTeamsBlur}
            min="6"
            max="22"
          />

          <input
            type="number"
            placeholder="Min Number of Teams"
            className={styles.inputField}
            value={minNumberOfTeams}
            onChange={handleMinTeamsChange}
            onBlur={handleMinTeamsBlur}
            min="5"
            max="21"
          />
          <Dropdown
            className={styles.dropdown}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            items={constants.GENDERS}
            placeholder="Gender"
          />
          <Dropdown
            className={styles.dropdown}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            items={constants.LEAGUE_STATUS}
            placeholder="Status"
          />
          <Dropdown
            className={styles.dropdown}
            value={matchDay}
            onChange={(e) => setMatchDay(e.target.value)}
            items={constants.WEEK_DAYS}
            placeholder="Match Day"
          />
          <Dropdown
            className={styles.dropdown}
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
            items={constants.COMPETITION}
            placeholder="Competition"
          />
          <Dropdown
            className={styles.dropdown}
            value={playOffs}
            onChange={(e) => setPlayOffs(e.target.value)}
            items={constants.BOOLEANS_WITH_UNKNOWN}
            placeholder="Play-Offs"
          />
          <Dropdown
            className={styles.dropdown}
            value={championLeague}
            onChange={(e) => setChampionLeague(e.target.value)}
            items={constants.BOOLEANS_WITH_UNKNOWN}
            placeholder="Champion League"
          />
          <Dropdown
            className={styles.dropdown}
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            items={constants.SPORTS}
            placeholder="Sport"
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
