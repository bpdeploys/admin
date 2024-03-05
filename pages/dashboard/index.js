import DashboardBox from '../../components/DashboardBox';
import Layout from '../../components/Layout/LayoutWrapper';
import withAuth from '../../hoc/withAuth';
import styles from './dashboard.module.scss';

const dashboardItems = [
  {
    name: 'Baller App',
    img: '/assets/imgs/svgs/bpLogo.svg',
  },
  {
    name: 'SportMapp',
    route: '/sportmapp',
    img: '/assets/imgs/svgs/smLogo.svg',
  },
  {
    name: 'UX',
    img: '/assets/imgs/svgs/uxLogo.svg',
  },
  {
    name: 'Rewards',
  },
  {
    name: 'StatsApp',
    img: '/assets/imgs/svgs/statsLogo.svg',
  },
  {
    name: 'Roster',
  },
  {
    name: 'Marketing Solutions',
  },
  {
    name: 'Admin',
    img: '/assets/imgs/svgs/logoBlack.svg',
  },
];

const DashboardPage = () => {
  return (
    <Layout>
      <div className={styles.dashboard}>
        <div className={styles.heading}>
          <h1>Welcome Dimitri</h1>
        </div>
        <div className={styles.content}>
          <h2>Choose your app</h2>
          <div className={styles.boxes}>
            {dashboardItems.map((dashboardItem) => (
              <DashboardBox
                key={dashboardItem}
                name={dashboardItem.name}
                img={dashboardItem.img}
                route={dashboardItem.route}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(DashboardPage);
