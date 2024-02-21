import Image from 'next/image';
import TagBox from '../../components/Common/TagBox';
import DashboardBox from '../../components/DashboardBox';
import Layout from '../../components/Layout/LayoutWrapper';
import styles from './sportmapp.module.scss';
import Breadcrumbs from '../../components/Sportsmapp/Breadcrumbs';
import { useSportsmappContext } from '../../context/SportsmappContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Modal from '../../components/Common/Modal';
import ProviderModal from '../../components/Sportsmapp/ProviderModal';
import GreenArrowButton from '../../components/Sportsmapp/GreenArrowBtn';
import BlueButton from '../../components/Sportsmapp/BlueBtn';

const sportsData = [
  {
    category: 'UK - Football',
    count: 3,
    providers: [
      {
        name: 'Powerleague',
        locations: 18,
        leagues: 45,
        teams: 360,
        players: 2880,
        icon: 'footballIcon.svg', // Assuming you are using a font icon library
        region: 'UK',
      },
      {
        name: 'Goals Soccer Centres',
        locations: 18,
        leagues: 45,
        teams: 360,
        players: 2880,
        icon: 'footballIcon.svg',
        region: 'UK',
      },
      {
        name: 'GoMammoth',
        locations: 18,
        leagues: 45,
        teams: 360,
        players: 2880,
        icon: 'footballIcon.svg',
        region: 'UK',
      },
    ],
  },
  {
    category: 'UK - Basketball',
    count: 2,
    providers: [
      {
        name: 'Power Play',
        locations: 18,
        leagues: 45,
        teams: 360,
        players: 2880,
        icon: 'basketballIcon.svg', // This icon name is just a placeholder
        region: 'UK',
      },
      {
        name: 'GoMammoth',
        locations: 18,
        leagues: 45,
        teams: 360,
        players: 2880,
        icon: 'basketballIcon.svg',
        region: 'UK',
      },
    ],
  },
];

const SportmappPage = () => {
  const router = useRouter();
  const { selectProvider } = useSportsmappContext();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Clear provider to avoid breadcrumb issues
  useEffect(() => {
    selectProvider(null);
  }, []);

  const onSelectProvider = (provider) => {
    selectProvider(provider);
    router.push('/sportmapp/venues');
  };

  return (
    <Layout>
      <ProviderModal showModal={showModal} toggleModal={toggleModal} />
      <div className={styles.dashboard}>
        <div className={styles.heading}>
          <div>
            <Image src="/assets/imgs/svgs/smLogo.svg" height={25} width={25} />
            <Breadcrumbs />
          </div>
          <div>
            <BlueButton
              text="SportMapp Metrics"
              onClick={() => toggleModal()}
            />
            <GreenArrowButton
              text="Create New Provider"
              onClick={() => toggleModal()}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.category}>
            <h2>Sports Providers • 5</h2>
          </div>
          {sportsData.map((sport) => (
            <div className={styles.category} key={sport.category}>
              <h2>
                {sport.category} • {sport.count}
              </h2>
              <div className={styles.boxes}>
                {sport.providers.map((provider) => (
                  <TagBox
                    key={provider.name}
                    onClick={() => onSelectProvider(provider)}
                    title={provider.name}
                    blueTag={`${provider.locations} locations`}
                    redTag={`${provider.leagues} leagues`}
                    greenTag={`${provider.teams} teams`}
                    orangeTag={`${provider.players} players`}
                    region={provider.region}
                    sportIcon={provider.icon}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SportmappPage;
