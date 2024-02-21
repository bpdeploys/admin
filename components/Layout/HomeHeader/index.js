import { useRouter } from 'next/router';

// Styles
import styles from './header.module.scss';
import Image from 'next/image';

/**
 * Header component
 *
 * @returns {React.Element} A header element
 */
const HomeHeader = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/assets/imgs/svgs/logo.svg" width={50} height={50} />
      </div>
      <button
        onClick={() => router.push('/login')}
        className={styles.loginButton}
      >
        Login
      </button>
    </header>
  );
};

export default HomeHeader;
