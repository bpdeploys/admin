import { useRouter } from 'next/router';

// Styles
import styles from './header.module.scss';
import Image from 'next/image';

import logo from '../../../public/assets/imgs/svgs/logo.svg';

/**
 * Header component
 *
 * @param {string} text The text to display in the header
 * @param {boolean} logo Whether or not to display the logo (default: false)
 * @param {boolean} uppercase Whether or not the text should be uppercase (default: false)
 * @param {boolean} shadow Whether or not the header should have a shadow (default: true)
 *
 * @returns {React.Element} A header element
 */
const Header = ({ button }) => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/assets/imgs/svgs/logo.svg" width={50} height={50} />
      </div>
      {button && (
        <button
          onClick={() => router.push('/login')}
          className={styles.loginButton}
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
