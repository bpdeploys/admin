import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Breadcrumbs from '../../../components/Sportsmapp/Breadcrumbs';
import BlueButton from '../../../components/Sportsmapp/BlueBtn';
import GreenArrowButton from '../../../components/Sportsmapp/GreenArrowBtn';
import TagBox from '../../../components/Common/TagBox';
import VenuesModal from '../../../components/Sportsmapp/VenuesModal';
import { useRouter } from 'next/router';
import { useSportsmappContext } from '../../../context/SportsmappContext';
import { fetchAllVenuesByProvider, createVenue } from '../../../services';
import styles from './venues.module.scss';
import withAuth from '../../../hoc/withAuth';
import { useLoading } from '../../../utils/hooks/useLoading';
import Loading from '../../../components/Common/Loading';
import CreateGeneralOverseerModal from '../../../components/Sportsmapp/CreateGeneralOverseerModal';
import Layout from '../../../components/Layout/sportmapp/LayoutWrapper';

const VenuesPage = () => {
  const router = useRouter();
  const { selectedProvider, selectVenue } = useSportsmappContext();
  const [venuesData, setVenuesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showGoModal, setShowGoModal] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleGoModal = () => {
    setShowGoModal(!showGoModal);
  };

  const fetchVenues = async () => {
    startLoading();
    try {
      if (selectedProvider) {
        const venues = await fetchAllVenuesByProvider(selectedProvider?.id);
        setVenuesData(venues);
      }
    } catch (error) {
      console.error('Error fetching venues');
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [selectedProvider]);

  useEffect(() => {
    selectVenue(null);
  }, []);

  const onSelectVenue = (venue) => {
    selectVenue(venue);
    router.push('/sportmapp/venues/leagues');
  };

  const handleVenueCreated = async () => {
    await fetchVenues();
    toggleModal();
  };

  return (
    <Layout>
      <div className={styles.dashboard}>
        <CreateGeneralOverseerModal
          showModal={showGoModal}
          toggleModal={toggleGoModal}
        />
        <VenuesModal
          showModal={showModal}
          toggleModal={toggleModal}
          selectedProvider={selectedProvider?.id}
          onVenueCreated={handleVenueCreated}
        />
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
          {isLoading ? (
            <div className={styles.loadingWrapper}>
              <Loading />
            </div>
          ) : (
            <>
              <div className={styles.category}>
                <h2>Venues • {venuesData.length}</h2>
              </div>
              <div className={styles.createGoButton}>
                <BlueButton
                  text="Create Personnel"
                  onClick={() => toggleGoModal()}
                />
              </div>
              <div className={styles.boxes}>
                {venuesData.map((venue) => (
                  <TagBox
                    key={venue?.id}
                    onClick={() => onSelectVenue(venue)}
                    title={venue.name}
                    blueTag={`${venue.sport_entity?.staff?.venue_managers?.length} VM's`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(VenuesPage);
