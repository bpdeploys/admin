import Image from 'next/image';
import Header from '../components/Layout/Header';
import styles from './index.module.scss';

const Home = () => {
  return (
    <div>
      <Header button />
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
