import Image from 'next/image';
import styles from './leagues.module.scss';
import Layout from '../../../../../components/Layout/LayoutWrapper';
import Breadcrumbs from '../../../../../components/Sportsmapp/Breadcrumbs';
import { useSportsmappContext } from '../../../../../context/SportsmappContext';
import { useEffect, useState } from 'react';
import GreenArrowButton from '../../../../../components/Sportsmapp/GreenArrowBtn';
import ButtonBox from '../../../../../components/Common/ButtonBox';
import PitchesModal from '../../../../../components/Sportsmapp/PitchesModal';
import {
  deleteLeague,
  deleteMatch,
  fetchMatchesByLeague,
  fetchPitchesByVenueAndFormat,
  fetchRefereesByVenue,
  fetchTeamsByLeague,
} from '../../../../../services';
import withAuth from '../../../../../hoc/withAuth';
import MatchBox from '../../../../../components/Sportsmapp/MatchBox';
import MatchesModal from '../../../../../components/Sportsmapp/MatchesModal';
import TeamsModal from '../../../../../components/Sportsmapp/TeamsModal';
import Loading from '../../../../../components/Common/Loading';
import DeleteButton from '../../../../../components/Sportsmapp/DeleteButton';
import { useRouter } from 'next/router';

const MatchesPage = () => {
  const router = useRouter();
  const { selectedLeague, selectedVenue, selectedProvider } =
    useSportsmappContext();
  const [showModal, setShowModal] = useState(false);
  const [matchesData, setMatchesData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [refereesData, setRefereesData] = useState([]);
  const [pitchesData, setPitchesData] = useState([]);
  const [showPitchesModal, setShowPitchesModal] = useState(false);
  const [showTeamsModal, setShowTeamsModal] = useState(false);

  // Loading
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loadingPitches, setLoadingPitches] = useState(false);
  const [loadingReferees, setLoadingReferees] = useState(false);

  const isLoading =
    loadingMatches || loadingTeams || loadingPitches || loadingReferees;

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const togglePitchesModal = () => setShowPitchesModal(!showPitchesModal);
  const toggleTeamsModal = () => setShowTeamsModal(!showTeamsModal);

  useEffect(() => {
    if (selectedLeague && selectedVenue) {
      fetchMatches();
      fetchTeams();
      fetchPitches();
      fetchReferees();
    }
  }, [selectedLeague, selectedVenue]);

  const fetchMatches = async () => {
    setLoadingMatches(true);
    try {
      const data = await fetchMatchesByLeague(selectedLeague.id);
      setMatchesData(data);
    } catch (error) {
      console.error('Error fetching matches', error);
    } finally {
      setLoadingMatches(false);
    }
  };

  const fetchTeams = async () => {
    setLoadingTeams(true);
    try {
      const data = await fetchTeamsByLeague(selectedLeague.id);
      setTeamsData(data);
    } catch (error) {
      console.error('Error fetching teams', error);
    } finally {
      setLoadingTeams(false);
    }
  };

  const fetchPitches = async () => {
    setLoadingPitches(true);
    try {
      const data = await fetchPitchesByVenueAndFormat(
        selectedVenue.id,
        selectedLeague.league_format
      );
      setPitchesData(data);
    } catch (error) {
      console.error('Error fetching pitches', error);
    } finally {
      setLoadingPitches(false);
    }
  };

  const fetchReferees = async () => {
    setLoadingReferees(true);
    try {
      const data = await fetchRefereesByVenue(selectedVenue.id);
      setRefereesData(data.results); // Assuming the results are nested
    } catch (error) {
      console.error('Error fetching referees', error);
    } finally {
      setLoadingReferees(false);
    }
  };

  const buttonBoxesData = [
    {
      title: 'Pitches',
      quantity: pitchesData?.length || 0,
      action: 'View Pitches',
      onClick: togglePitchesModal,
    },
    {
      title: 'Teams',
      quantity: teamsData?.length || 0,
      action: 'View Teams',
      onClick: toggleTeamsModal,
    },
  ];

  const handleMatchCreated = async () => {
    await fetchMatches();
    toggleModal();
  };

  const handlePitchRefetch = async () => {
    await fetchPitches();
  };

  const handleRefetchTeams = async () => {
    await fetchTeams();
  };

  const handleDeleteLeague = async () => {
    const confirmDeletion = window.confirm(
      'Are you sure you want to delete this league?'
    );
    if (confirmDeletion) {
      try {
        await deleteLeague(selectedLeague?.id);
        router.push('/sportmapp/venues/leagues/');
      } catch (error) {
        console.error('Failed to delete the league');
      }
    }
  };

  const handleDeleteMatch = async (matchId) => {
    try {
      await deleteMatch(matchId);
      setMatchesData(matchesData.filter((match) => match.id !== matchId));
      await fetchMatches();
    } catch (error) {
      console.error('Error deleting match', error);
    }
  };

  function convertFormat(format, sport) {
    // Use a regular expression to match the [number]v[number] pattern
    const regex = /(\d+)v(\d+)/i;

    // Check if the format matches the pattern
    const match = format?.match(regex);

    // If there's a match and both numbers are the same (e.g., 7v7, 11v11)
    if (match && match[1] === match[2]) {
      // Return the converted format (e.g., "7-a-side")
      return `${match[1]}-aside ${sport || 'football'}`;
    }

    // If the format doesn't match the pattern or numbers are different, return the original format
    return format;
  }

  return (
    <Layout>
      <div className={styles.dashboard}>
        <MatchesModal
          showModal={showModal}
          toggleModal={toggleModal}
          onMatchCreated={handleMatchCreated}
          referees={refereesData}
          pitches={pitchesData}
          teams={teamsData}
          selectedLeague={selectedLeague?.id}
          selectedVenue={selectedVenue?.id}
        />
        <PitchesModal
          showModal={showPitchesModal}
          toggleModal={togglePitchesModal}
          selectedVenue={selectedVenue?.id}
          pitchesData={pitchesData}
          refetchPitches={handlePitchRefetch}
        />
        <TeamsModal
          showModal={showTeamsModal}
          toggleModal={toggleTeamsModal}
          selectedLeague={selectedLeague?.id}
          selectedVenue={selectedVenue?.id}
          selectedProvider={selectedProvider?.id}
          teamsData={teamsData}
          refetchTeams={handleRefetchTeams}
        />
        <div className={styles.heading}>
          <div>
            <Image src="/assets/imgs/svgs/smLogo.svg" height={25} width={25} />
            <Breadcrumbs />
          </div>
          <div>
            <DeleteButton text="Delete League" onClick={handleDeleteLeague} />
            <GreenArrowButton
              text="Create New Match"
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
              <div className={styles.category} />
              <div className={styles.category}>
                <h2>
                  {selectedLeague?.league_format
                    ? `${selectedLeague?.league_name} • ${convertFormat(
                        selectedLeague?.league_format
                      )}`
                    : selectedLeague?.league_name}
                </h2>
              </div>
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
                <h2>Matches • {matchesData.length}</h2>
              </div>
              <div className={styles.boxes}>
                {matchesData.map((match) => {
                  return (
                    <MatchBox
                      key={match.id}
                      team1={match.team1.team_name}
                      team2={match.team2.team_name}
                      date={match.date}
                      onDelete={() => handleDeleteMatch(match.id)}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(MatchesPage);
