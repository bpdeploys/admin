// Styles
import Image from 'next/image';
import styles from './dashboardbox.module.scss';
import { useRouter } from 'next/router';

/**
 * Profile Selection component
 *
 * @param {string} name The name of the app to show in the box
 * @param {string} img The source of the image
 * @param {function} onClick The function to call when an item is clicked
 *
 * @returns {React.Element} A Profile Selection element
 */
const DashboardBox = ({ name, img, route }) => {
  const router = useRouter();

  const onSelectBox = () => {
    router.push(route || '/dashboard');
  };

  return (
    <div className={styles.box} onClick={() => onSelectBox()}>
      <span>{name}</span>
      {img && <Image src={img} width={40} height={40} />}
    </div>
  );
};

export default DashboardBox;
