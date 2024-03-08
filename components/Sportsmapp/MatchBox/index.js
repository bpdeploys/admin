import React from 'react';
import styles from './matchbox.module.scss';
import Image from 'next/image';

/**
 * Renders a match box component with team information, league number, and match date.
 *
 * @param {function} onClick - The click event handler
 * @param {string} team1 - The name of the first team
 * @param {string} team2 - The name of the second team
 * @param {string} matchDate - The date of the match
 * @return {JSX.Element} The rendered match box component
 */
const MatchBox = ({ onClick, team1, team2, date }) => {
  return (
    <div className={styles.box} onClick={onClick}>
      <div className={styles.teams}>
        <h3>{team1}</h3>
        <span>vs</span>
        <h3>{team2}</h3>
      </div>
      <div className={styles.tags}>
        {date && <span className={styles.greenTag}>{date}</span>}
      </div>
    </div>
  );
};

export default MatchBox;
