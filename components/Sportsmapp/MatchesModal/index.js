import React, { useState, useEffect } from 'react';
import Modal from '../../Common/Modal';
import {
  createMatch,
  fetchTeams,
  fetchReferees,
  fetchPitches,
} from '../../../services'; // Ensure these functions are implemented in your services
import styles from './matchesmodal.module.scss';
import Dropdown from '../../Common/Dropdown';

/**
 * Renders a modal to create a new match
 *
 * @param {Object} showModal - boolean to show or hide the modal
 * @param {Function} toggleModal - function to toggle the modal visibility
 * @param {Function} onMatchCreated - callback function triggered when a match is created
 * @param {Array} referees - array of referee objects
 * @param {Array} teams - array of team objects
 * @param {Array} pitches - array of pitch objects
 * @param {string} selectedLeague - selected league
 * @return {JSX.Element} The modal to create a new match
 */
const MatchesModal = ({
  showModal,
  toggleModal,
  onMatchCreated,
  referees,
  teams,
  pitches,
  selectedLeague,
  selectedVenue,
}) => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [matchType, setMatchType] = useState('');
  const [gameTime, setGameTime] = useState('');
  const [kickOff, setKickOff] = useState('');
  const [date, setDate] = useState('');
  const [referee, setReferee] = useState('');
  const [pitch, setPitch] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [live, setLive] = useState(false);
  const [dateInputType, setDateInputType] = useState('text');
  const [timeInputType, setTimeInputType] = useState('text');

  const handleDateFocus = () => setDateInputType('date');
  const handleDateBlur = () => !date && setDateInputType('text');

  const handleTimeFocus = () => setTimeInputType('time');
  const handleTimeBlur = () => !gameTime && setTimeInputType('text');

  const matchTypeOptions = [
    { id: 'League', name: 'League' },
    { id: 'Friendly', name: 'Friendly' },
    { id: 'Kick-about', name: 'Kick-about' },
  ];

  const refereesWithAllOption = [
    { id: 'all', user: { first_name: 'All', last_name: '' } },
    ...referees,
  ];

  const resetForm = () => {
    setTeam1('');
    setTeam2('');
    setMatchType('');
    setGameTime('');
    setKickOff('');
    setDate('');
    setReferee('');
    setPitch('');
    setAccepted(false);
    setLive(false);
  };

  const handleSubmit = async () => {
    // If "All" is selected for referee, set referee value to an empty string or null
    const effectiveReferee = referee === 'all' ? '' : referee;

    try {
      const matchData = {
        team1,
        team2,
        league: selectedLeague,
        match_type: matchType,
        accepted,
        game_time: gameTime,
        kick_off: kickOff,
        date,
        live,
        referee: effectiveReferee,
        pitch,
        created_by_venue: selectedVenue,
        league_match: 1,
        matchweek: 1,
      };
      await createMatch(matchData);
      resetForm();
      alert('Match created successfully');
      if (onMatchCreated) {
        onMatchCreated();
      }
    } catch (error) {
      console.error('Error creating match');
    }
  };

  return (
    <Modal show={showModal} modalClosed={toggleModal} title="Create New Match">
      <div className={styles.container}>
        <div className={styles.inputs}>
          <Dropdown
            className={styles.dropdown}
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            items={teams}
            placeholder="Select Team 1"
            labelKey="team_name"
          />
          <Dropdown
            className={styles.dropdown}
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            items={teams}
            placeholder="Select Team 2"
            labelKey="team_name"
          />
          <input
            type={dateInputType}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
            className={styles.inputField}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Match Date"
          />
          <input
            type={timeInputType}
            className={styles.inputField}
            onFocus={handleTimeFocus}
            onBlur={handleTimeBlur}
            value={gameTime}
            onChange={(e) => setGameTime(e.target.value)}
            placeholder="Game Time"
          />
          <Dropdown
            className={styles.dropdown}
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            items={pitches}
            placeholder="Select Pitch"
          />
          <Dropdown
            className={styles.dropdown}
            value={referee}
            onChange={(e) => setReferee(e.target.value)}
            items={refereesWithAllOption}
            placeholder="Select Referee"
            labelKey="user.first_name + user.last_name"
          />
          <Dropdown
            className={styles.dropdown}
            value={matchType}
            onChange={(e) => setMatchType(e.target.value)}
            items={matchTypeOptions}
            placeholder="Select Match Type"
          />
          <input
            type={timeInputType}
            className={styles.inputField}
            onFocus={handleTimeFocus}
            onBlur={handleTimeBlur}
            value={kickOff}
            onChange={(e) => setKickOff(e.target.value)}
            placeholder="Kick Off Time"
          />
          <div className={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
              />{' '}
              Accepted
            </label>
            <label>
              <input
                type="checkbox"
                checked={live}
                onChange={() => setLive(!live)}
              />{' '}
              Live
            </label>
          </div>
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          Create Match
        </button>
      </div>
    </Modal>
  );
};

export default MatchesModal;
