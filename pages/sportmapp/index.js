import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProviderModal from '../../components/Sportsmapp/ProviderModal';
import BlueButton from '../../components/Sportsmapp/BlueBtn';
import GreenArrowButton from '../../components/Sportsmapp/GreenArrowBtn';
import Breadcrumbs from '../../components/Sportsmapp/Breadcrumbs';
import Layout from '../../components/Layout/sportmapp/LayoutWrapper';
import TagBox from '../../components/Common/TagBox';
import { useSportsmappContext } from '../../context/SportsmappContext';
import { useRouter } from 'next/router';
import { fetchAllProviders } from '../../services';
import styles from './sportmapp.module.scss';
import withAuth from '../../hoc/withAuth';
import { useLoading } from '../../utils/hooks/useLoading';
import Loading from '../../components/Common/Loading';

const SportmappPage = () => {
  const router = useRouter();
  const { selectProvider } = useSportsmappContext();
  const [showModal, setShowModal] = useState(false);
  const [sportsData, setSportsData] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fetchProviders = async () => {
    startLoading(); // Start loading indicator
    try {
      const providers = await fetchAllProviders(1);
      setSportsData(providers);
    } catch (error) {
      console.error('Error fetching providers');
    } finally {
      stopLoading(); // Stop loading indicator
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    selectProvider(null);
  }, []);

  const onSelectProvider = (provider) => {
    selectProvider(provider);
    router.push('/sportmapp/venues');
  };

  const handleProviderCreated = () => {
    fetchProviders();
    toggleModal();
  };

  return (
    <Layout>
      <ProviderModal
        showModal={showModal}
        toggleModal={toggleModal}
        onProviderCreated={handleProviderCreated}
      />
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
          {isLoading ? (
            <div className={styles.loadingWrapper}>
              <Loading />
            </div>
          ) : (
            <>
              <div className={styles.category}>
                <h2>Sports Providers • {sportsData.length}</h2>
              </div>
              <div className={styles.boxes}>
                {sportsData.map((provider) => (
                  <TagBox
                    key={provider?.category}
                    onClick={() => onSelectProvider(provider)}
                    title={provider?.name}
                    // blueTag={`${provider?.locations} locations`}
                    // redTag={`${provider?.leagues} leagues`}
                    // greenTag={`${provider?.teams} teams`}
                    // orangeTag={`${provider?.players} players`}
                    // region={provider?.region}
                    // sportIcon={provider?.icon}
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

export default withAuth(SportmappPage);
