import React from 'react';
import styles from './tagbox.module.scss';
import Image from 'next/image';

const TagBox = ({
  onClick,
  title,
  blueTag,
  greenTag,
  redTag,
  orangeTag,
  region,
  sportIcon,
  sponsor,
}) => {
  return (
    <div className={styles.box} onClick={onClick}>
      <h3>{title}</h3>
      <div className={styles.tags}>
        <span className={styles.blueTag}>{blueTag}</span>
        <span className={styles.greenTag}>{greenTag}</span>
        <span className={styles.redTag}>{redTag}</span>
        <span className={styles.orangeTag}>{orangeTag}</span>
      </div>
      <div className={styles.details}>
        <Image
          src={`/assets/imgs/svgs/sports/${sportIcon}`}
          width={12}
          height={12}
        />
        {region && <p className={styles.region}>{region}</p>}
        {sponsor && <p className={styles.sponsor}>{sponsor}</p>}
      </div>
    </div>
  );
};

export default TagBox;
