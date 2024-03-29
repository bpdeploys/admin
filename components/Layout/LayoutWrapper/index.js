import Header from '../Header';
import Sidebar from '../Sidebar';
import styles from './layout.module.scss';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <Sidebar className={styles.sidebar} />
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
