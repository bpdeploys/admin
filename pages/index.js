import Image from 'next/image';
import styles from './index.module.scss';
import HomeHeader from '../components/Layout/HomeHeader';

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <main className={styles.mainContent}>
        <div className={styles.whiteBox}>
          <div className={styles.placeholderImage}>
            <Image
              src="/assets/imgs/svgs/logoBlack.svg"
              width={360}
              height={520}
            />
          </div>
        </div>
        <p className={styles.descriptionText}>
          Administration platform for the Suite of BallerProfile applications
        </p>
      </main>
    </div>
  );
};

export default Home;
