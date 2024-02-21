import React from 'react';
import styles from './leaguebox.module.scss';
import Image from 'next/image';

const LeagueBox = ({
  onClick,
  title,
  leagueNumber,
  blueTag,
  greenTag,
  grayTag,
  orangeTag,
}) => {
  return (
    <div className={styles.box} onClick={onClick}>
      <h3>{title}</h3>
      <span className={styles.leagueNumber}>{leagueNumber}</span>
      <div className={styles.tags}>
        {blueTag && <span className={styles.blueTag}>{blueTag}</span>}
        {greenTag && <span className={styles.greenTag}>{greenTag}</span>}
        {orangeTag && <span className={styles.orangeTag}>{orangeTag}</span>}
        {grayTag && <span className={styles.grayTag}>{grayTag}</span>}
      </div>
    </div>
  );
};

export default LeagueBox;
