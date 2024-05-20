import React, { useState, useEffect } from 'react';
import ProviderModal from '../../components/Sportsmapp/ProviderModal';
import GreenArrowButton from '../../components/Sportsmapp/GreenArrowBtn';
import Breadcrumbs from '../../components/Sportsmapp/Breadcrumbs';
import TagBox from '../../components/Common/TagBox';
import { useSportsmappContext } from '../../context/SportsmappContext';
import { useRouter } from 'next/router';
import styles from './sportmapp.module.scss';
import withAuth from '../../hoc/withAuth';
import { useLoading } from '../../utils/hooks/useLoading';
import Loading from '../../components/Common/Loading';
import Layout from '../../components/Layout/MarketingSolutions/LayoutWrapper';
import CompanyModal from '../../components/MarketingSolutions/CompanyModal';
import CountBox from '../../components/Common/CountBox';

const SportmappPage = () => {
  const router = useRouter();
  const { selectProvider } = useSportsmappContext();
  const [showModal, setShowModal] = useState(false);
  const [sportsData, setSportsData] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const campaignData = {
    affiliateCampaigns: {
      title: 'Affiliate Campaigns',
      count: 3,
    },
    advertisingCampaigns: {
      title: 'Advertising Campaigns',
      count: 3,
    },
    auctionCampaigns: {
      title: 'Auction Campaigns',
      count: 3,
    },
    companies: {
      title: 'Companies',
      count: 150,
    },
    countries: {
      title: 'Countries',
      count: 27,
    },
  };

  const campaignArray = Object.keys(campaignData).map((key) => ({
    type: key,
    title: campaignData[key].title,
    count: campaignData[key].count,
  }));

  return (
    <Layout>
      <CompanyModal showModal={showModal} toggleModal={toggleModal} />
      <div className={styles.dashboard}>
        <div className={styles.heading}>
          <div>Marketing Solutions</div>
          <div>
            <GreenArrowButton
              text="Create New Company"
              onClick={() => toggleModal()}
              arrow={false}
            />
          </div>
        </div>
        <div className={styles.content}>
          {isLoading ? (
            <div className={styles.loadingWrapper}>
              <Loading color="#0B780F" />
            </div>
          ) : (
            <>
              <div className={styles.boxes}>
                {campaignArray.map((provider) => (
                  <CountBox
                    key={provider?.title}
                    title={provider?.title}
                    count={provider?.count}
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
