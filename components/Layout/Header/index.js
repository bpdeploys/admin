import { useRouter } from 'next/router';

// Styles
import styles from './header.module.scss';
import Image from 'next/image';

/**
 * Header component
 *
 * @param {string} text The text to display in the header
 * @param {boolean} logo Whether or not to display the logo (default: false)
 * @param {boolean} uppercase Whether or not the text should be uppercase (default: false)
 *
 * @returns {React.Element} A header element
 */
const Header = ({ hideElements }) => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => router.push('/dashboard')}>
        <Image src="/assets/imgs/svgs/logo.svg" width={50} height={50} />
      </div>
      {hideElements ? <></> : <></>}
    </header>
  );
};

export default Header;
