import React, { useState } from 'react';
import styles from './matchbox.module.scss';
import Image from 'next/image';

/**
 * Renders a match box component with team information, league number, and match date.
 *
 * @param {function} onClick - The click event handler
 * @param {function} onDelete - The delete event handler
 * @param {string} team1 - The name of the first team
 * @param {string} team2 - The name of the second team
 * @param {string} matchDate - The date of the match
 * @return {JSX.Element} The rendered match box component
 */
const MatchBox = ({ onClick, onDelete, team1, team2, date }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this match?'
    );
    if (confirmDelete) {
      onDelete();
    }
  };

  return (
    <div
      className={styles.box}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.teams}>
        <h3>{team1}</h3>
        <span>vs</span>
        <h3>{team2}</h3>
      </div>
      <div className={styles.tags}>
        {date && <span className={styles.greenTag}>{date}</span>}
      </div>

      <div
        className={styles.deleteIcon}
        onClick={handleDeleteClick}
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <Image
          src="/assets/imgs/svgs/trash.svg"
          alt="Delete"
          width={18}
          height={18}
        />
      </div>
    </div>
  );
};

export default MatchBox;
