// Styles
import Image from 'next/image';
import styles from './dashboardbox.module.scss';

/**
 * Profile Selection component
 *
 * @param {string} name The name of the app to show in the box
 * @param {string} img The source of the image
 * @param {function} onClick The function to call when an item is clicked
 *
 * @returns {React.Element} A Profile Selection element
 */
const DashboardBox = ({ name, img, onClick }) => {
  return (
    <div className={styles.box} onClick={onClick}>
      <span>{name}</span>
      {img && <Image src={img} width={40} height={40} />}
    </div>
  );
};

export default DashboardBox;
