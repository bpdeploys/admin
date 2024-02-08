import Image from 'next/image';
import styles from './venues.module.scss';
import TagBox from '../../../components/Common/TagBox';
import Layout from '../../../components/Layout/LayoutWrapper';
import Breadcrumbs from '../../../components/Sportsmapp/Breadcrumbs';
import { useRouter } from 'next/router';
import { useSportsmappContext } from '../../../context/SportsmappContext';
import { useEffect } from 'react';

const venuesData = [
  {
    name: 'Arlington',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'Barnet',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'East Finchley',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'Finchley',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'Arlington',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'Barnet',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'East Finchley',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'Finchley',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'Arlington',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'Barnet',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'East Finchley',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
  {
    name: 'Finchley',
    blueTag: "3 VM's",
    greenTag: '6 leagues',
    redTag: '45 teams',
    orangeTag: '175 players',
    sportIcon: 'footballIcon.svg',
    sponsor: '3 sponsored leagues',
  },
];

const DashboardPage = () => {
  const router = useRouter();
  const { selectVenue } = useSportsmappContext();

  // Clear venue to avoid breadcrumb issues
  useEffect(() => {
    selectVenue(null);
  }, []);

  const onSelectVenue = (provider) => {
    selectVenue(provider);
    router.push('/sportmapp/venues');
  };

  return (
    <Layout>
      <div className={styles.dashboard}>
        <div className={styles.heading}>
          <Image src="/assets/imgs/svgs/smLogo.svg" height={25} width={25} />
          <Breadcrumbs />
        </div>
        <div className={styles.content}>
          <div className={styles.category}>
            <h2>Venues • {venuesData.length}</h2>
          </div>
          <div className={styles.boxes}>
            {venuesData.map((venue) => (
              <TagBox
                key={venue.name}
                onClick={() => onSelectVenue(venue)}
                title={venue.name}
                blueTag={venue.blueTag}
                greenTag={venue.greenTag}
                redTag={venue.redTag}
                orangeTag={venue.orangeTag}
                region={venue.region}
                sportIcon={venue.sportIcon}
                sponsor={venue.sponsor}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
