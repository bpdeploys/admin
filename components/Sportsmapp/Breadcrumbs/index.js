import { useSportsmappContext } from '../../../context/SportsmappContext';
import BreadcrumbDivider from '../../Common/BreadcrumbDivider';
import styles from './breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const { selectedProvider, selectedVenue, selectedLeague } =
    useSportsmappContext();

  console.log('BREADCRUMB DATA - VENUE:', selectedVenue);
  console.log('BREADCRUMB DATA - LEAGUE:', selectedLeague);

  return (
    <div className={styles.breadcrumbs}>
      <h1>SportMapp </h1>
      {selectedProvider && (
        <>
          <BreadcrumbDivider />
          <span>{selectedProvider.name}</span>
        </>
      )}
      {selectedVenue && (
        <>
          <BreadcrumbDivider />
          <span>{selectedVenue.name}</span>
        </>
      )}
      {selectedLeague && (
        <>
          <BreadcrumbDivider />
          <span>{selectedLeague.league_name}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
