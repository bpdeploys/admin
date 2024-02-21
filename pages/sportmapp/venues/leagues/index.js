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

const leaguesData = [
  {
    name: 'Monday Night Football',
    numTeams: '10 teams',
    type: '7 aside',
    numPlayers: '80 players',
    currentCount: '82 / 90',
    leagueNumber: '5',
    weekDay: 'Monday',
  },
  {
    name: 'Tuesday Games',
    numTeams: '10 teams',
    type: '7 aside',
    currentCount: '82 / 90',
    leagueNumber: '5',
    weekDay: 'Tuesday',
  },
  {
    name: 'Tuesday Masters',
    numTeams: '10 teams',
    type: '7 aside',
    currentCount: '82 / 90',
    leagueNumber: '5',
    weekDay: 'Tuesday',
  },
  {
    name: 'Friday Night Football',
    numTeams: '10 teams',
    type: '7 aside',
    currentCount: '82 / 90',
    leagueNumber: '5',
    weekDay: 'Friday',
  },
  {
    name: 'Friday Games',
    numTeams: '10 teams',
    type: '7 aside',
    currentCount: '82 / 90',
    leagueNumber: '5',
    weekDay: 'Friday',
  },
];

const LeaguesPage = () => {
  const router = useRouter();
  const { selectLeague } = useSportsmappContext();
  const [showModal, setShowModal] = useState(false);
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
      quantity: 4,
      action: 'View Pitches',
      onClick: togglePitchesModal,
    },
    {
      title: 'Referees',
      quantity: 5,
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

  return (
    <Layout>
      <div className={styles.dashboard}>
        <LeaguesModal showModal={showModal} toggleModal={toggleModal} />
        <PitchesModal
          showModal={showPitchesModal}
          toggleModal={togglePitchesModal}
        />
        <RefereesModal
          showModal={showRefereesModal}
          toggleModal={toggleRefereesModal}
        />
        <VenuesManagerModal
          showModal={showVenueManagersModal}
          toggleModal={toggleVenueManagersModal}
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
            {leaguesData.map((league) => (
              <LeagueBox
                key={league.name}
                onClick={() => onSelectLeague(league)}
                title={league.name}
                blueTag={league.numTeams}
                greenTag={league.type}
                grayTag={league.currentCount}
                orangeTag={league.numPlayers}
                leagueNumber={league.leagueNumber}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaguesPage;
