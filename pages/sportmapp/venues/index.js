import Image from 'next/image';
import styles from './venues.module.scss';
import TagBox from '../../../components/Common/TagBox';
import Layout from '../../../components/Layout/LayoutWrapper';
import Breadcrumbs from '../../../components/Sportsmapp/Breadcrumbs';
import { useRouter } from 'next/router';
import { useSportsmappContext } from '../../../context/SportsmappContext';
import { useEffect, useState } from 'react';
import BlueButton from '../../../components/Sportsmapp/BlueBtn';
import GreenArrowButton from '../../../components/Sportsmapp/GreenArrowBtn';
import VenuesModal from '../../../components/Sportsmapp/VenuesModal';
import { fetchAllVenuesByProvider } from '../../../services';

const VenuesPage = () => {
  const router = useRouter();
  const { selectedProvider, selectVenue } = useSportsmappContext();
  const [venuesData, setVenuesData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedProvider) {
          const venues = await fetchAllVenuesByProvider(1);
          setVenuesData(venues);
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchData();
  }, [selectedProvider]);

  // Clear venue to avoid breadcrumb issues
  useEffect(() => {
    selectVenue(null);
  }, []);

  const onSelectVenue = (venue) => {
    selectVenue(venue);
    router.push('/sportmapp/venues/leagues');
  };

  return (
    <Layout>
      <div className={styles.dashboard}>
        <VenuesModal showModal={showModal} toggleModal={toggleModal} />
        <div className={styles.heading}>
          <div>
            <Image src="/assets/imgs/svgs/smLogo.svg" height={25} width={25} />
            <Breadcrumbs />
          </div>
          <div>
            <BlueButton text="Provider Metrics" onClick={() => toggleModal()} />
            <GreenArrowButton
              text="Create New Venues"
              onClick={() => toggleModal()}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.category}>
            <h2>Venues • {venuesData.length}</h2>
          </div>
          <div className={styles.boxes}>
            {venuesData.map((venue) => (
              <TagBox
                key={venue.id}
                onClick={() => onSelectVenue(venue)}
                title={venue.name}
                blueTag={`${venue.sport_entity?.staff?.venue_managers?.length} VM's`}
                greenTag={`${venue.sport_entity.name} leagues`}
                redTag={`${venue.count_teams} teams`}
                orangeTag={`${venue.count_players} players`}
                // Assuming you have a mapping of sport icons based on sport names
                sportIcon={`${venue.sport_entity.name.toLowerCase()}Icon.svg`}
                sponsor={`${venue.sponsor_count} sponsored leagues`}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VenuesPage;
