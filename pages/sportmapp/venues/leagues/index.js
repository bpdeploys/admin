import Image from 'next/image';
import styles from './leagues.module.scss';
import TagBox from '../../../../components/Common/TagBox';
import Layout from '../../../../components/Layout/LayoutWrapper';
import Breadcrumbs from '../../../../components/Sportsmapp/Breadcrumbs';
import { useRouter } from 'next/router';
import { useSportsmappContext } from '../../../../context/SportsmappContext';
import { useEffect, useState } from 'react';
import BlueButton from '../../../../components/Sportsmapp/BlueBtn';
import GreenArrowButton from '../../../../components/Sportsmapp/GreenArrowBtn';
import VenuesModal from '../../../../components/Sportsmapp/VenuesModal';
import LeagueBox from '../../../../components/Common/LeagueBox';
import ButtonBox from '../../../../components/Common/ButtonBox';
import PitchesModal from '../../../../components/Sportsmapp/PitchesModal';
import RefereesModal from '../../../../components/Sportsmapp/RefereesModal';
import VenuesManagerModal from '../../../../components/Sportsmapp/VenueManagerModal';
import LeaguesModal from '../../../../components/Sportsmapp/LeaguesModal';
import {
  fetchAllLeaguesByVenue,
  getPitchesByVenue,
  getRefereesByVenue,
  getVenueManagersByVenue,
} from '../../../../services';
import withAuth from '../../../../hoc/withAuth';

const LeaguesPage = () => {
  const router = useRouter();
  const { selectLeague, selectedVenue, selectedProvider } =
    useSportsmappContext();
  const [showModal, setShowModal] = useState(false);
  const [leaguesData, setLeaguesData] = useState([]);
  const [refereesData, setRefereesData] = useState([]);
  const [pitchesData, setPitchesData] = useState([]);
  const [vmsData, setVmsData] = useState([]);
  const [showPitchesModal, setShowPitchesModal] = useState(false);
  const [showRefereesModal, setShowRefereesModal] = useState(false);
  const [showVenueManagersModal, setShowVenueManagersModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const togglePitchesModal = () => setShowPitchesModal(!showPitchesModal);
  const toggleRefereesModal = () => setShowRefereesModal(!showRefereesModal);
  const toggleVenueManagersModal = () =>
    setShowVenueManagersModal(!showVenueManagersModal);

  const fetchLeagues = async () => {
    try {
      const data = await fetchAllLeaguesByVenue(selectedVenue.id);
      setLeaguesData(data); // Set fetched data to state
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  const fetchPitches = async () => {
    try {
      const data = await getPitchesByVenue(selectedVenue.id);
      setPitchesData(data);
    } catch (error) {
      console.error('Error fetching pitches:', error);
    }
  };

  const fetchReferees = async () => {
    try {
      const data = await getRefereesByVenue(selectedVenue.id);
      setRefereesData(data.results);
    } catch (error) {
      console.error('Error fetching referees:', error);
    }
  };

  const fetchVms = async () => {
    try {
      const data = await getVenueManagersByVenue(selectedVenue.id);
      setVmsData(data);
    } catch (error) {
      console.error('Error fetching venue managers:', error);
    }
  };

  // Fetch leagues data when component mounts
  useEffect(() => {
    fetchLeagues();
    fetchPitches();
    fetchReferees();
    fetchVms();
  }, [selectedVenue]);

  // Clear venue to avoid breadcrumb issues
  useEffect(() => {
    selectLeague(null);
  }, []);

  const onSelectLeague = (provider) => {
    selectLeague(provider);
  };

  const buttonBoxesData = [
    {
      title: 'Pitches',
      quantity: pitchesData?.length || 0,
      action: 'View Pitches',
      onClick: togglePitchesModal,
    },
    {
      title: 'Referees',
      quantity: refereesData?.length || 0,
      action: 'View Referees',
      onClick: toggleRefereesModal,
    },
    {
      title: 'Venue Managers',
      quantity: 4,
      action: "View VM's",
      onClick: toggleVenueManagersModal,
    },
  ];

  const handleLeagueCreated = async () => {
    await fetchLeagues();
    toggleModal();
  };

  const handlePitchRefetch = async () => {
    await fetchPitches();
  };

  const handleRefereeRefetch = async () => {
    await fetchReferees();
  };

  const handleVmRefetch = async () => {
    await fetchVms();
  };

  return (
    <Layout>
      <div className={styles.dashboard}>
        <LeaguesModal
          showModal={showModal}
          toggleModal={toggleModal}
          onLeagueCreated={handleLeagueCreated}
          selectedVenue={selectedVenue?.id}
          selectedProvider={selectedProvider?.id}
        />
        <PitchesModal
          showModal={showPitchesModal}
          toggleModal={togglePitchesModal}
          selectedVenue={selectedVenue?.id}
          pitchesData={pitchesData}
          refetchPitches={handlePitchRefetch}
        />
        <RefereesModal
          showModal={showRefereesModal}
          toggleModal={toggleRefereesModal}
          selectedVenue={selectedVenue?.id}
          refereesData={refereesData}
          refetchReferees={handleRefereeRefetch}
        />
        <VenuesManagerModal
          showModal={showVenueManagersModal}
          toggleModal={toggleVenueManagersModal}
          selectedVenue={selectedVenue?.id}
          vmsData={vmsData}
          refetchVms={handleVmRefetch}
        />
        <div className={styles.heading}>
          <div>
            <Image src="/assets/imgs/svgs/smLogo.svg" height={25} width={25} />
            <Breadcrumbs />
          </div>
          <div>
            <GreenArrowButton
              text="Create New League"
              onClick={() => toggleModal()}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.category} />
          <div className={styles.boxes}>
            {buttonBoxesData.map((box, index) => (
              <ButtonBox
                key={index}
                title={box.title}
                quantity={box.quantity}
                action={box.action}
                onClick={box.onClick}
              />
            ))}
          </div>
          <div className={styles.category}>
            <h2>Leagues • {leaguesData.length}</h2>
          </div>
          <div className={styles.boxes}>
            {leaguesData.map((league) => {
              const totalPlayers = league.teams_in_league.reduce(
                (total, teamData) => {
                  return total + teamData.team.number_of_players;
                },
                0
              );

              return (
                <LeagueBox
                  key={league.id}
                  onClick={() => onSelectLeague(league)}
                  title={league.league_name}
                  blueTag={`${league.number_of_teams} teams`}
                  greenTag={league.sport_entity.name}
                  grayTag={`82 / 90`}
                  orangeTag={
                    totalPlayers > 0 ? `${totalPlayers} players` : null
                  }
                  leagueNumber={league.id.toString()}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(LeaguesPage);
