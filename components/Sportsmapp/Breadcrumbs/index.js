import Link from 'next/link';
import { useSportsmappContext } from '../../../context/SportsmappContext';
import BreadcrumbDivider from '../../Common/BreadcrumbDivider';
import styles from './breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const { selectedProvider, selectedVenue, selectedLeague } =
    useSportsmappContext();

  return (
    <div className={styles.breadcrumbs}>
      <Link href="/sportmapp">
        <h1>SportMapp </h1>
      </Link>
      {selectedProvider && (
        <Link href="/sportmapp">
          <BreadcrumbDivider />
          <span>{selectedProvider.name}</span>
        </Link>
      )}
      {selectedVenue && (
        <Link href="/sportmapp/venues">
          <BreadcrumbDivider />
          <span>{selectedVenue.name}</span>
        </Link>
      )}
      {selectedLeague && (
        <Link href="/sportmapp/venues/leagues">
          <BreadcrumbDivider />
          <span>{selectedLeague.league_name}</span>
        </Link>
      )}
    </div>
  );
};

export default Breadcrumbs;
