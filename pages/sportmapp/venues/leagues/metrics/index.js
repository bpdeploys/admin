import React from 'react';
import Image from 'next/image';

import BlueButton from '../../../../../components/Sportsmapp/BlueBtn';
import GreenArrowButton from '../../../../../components/Sportsmapp/GreenArrowBtn';
import { useRouter } from 'next/router';
import styles from './metrics.module.scss';
import withAuth from '../../../../../hoc/withAuth';
import { useLoading } from '../../../../../utils/hooks/useLoading';
import Loading from '../../../../../components/Common/Loading';
import Layout from '../../../../../components/Layout/sportmapp/LayoutWrapper';
import Breadcrumbs from '../../../../../components/Sportsmapp/Breadcrumbs';
import BigCountBox from '../../../../../components/Common/BigCountBox';
import { exportToCsv } from '../../../../../utils/functions';
import BigDropdown from '../../../../../components/Common/BigDropdown';

const VenueMetricsPage = () => {
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const {
    isLoading: isLoadingExport,
    startLoading: startLoadingExport,
    stopLoading: stopLoadingExport,
  } = useLoading();

  const data = [
    {
      league: 'Monday Night Fives',
      day: 'Monday',
      date: '18/01/2024',
      matches: 17,
      total: '£85',
      cancelled: 0,
      players: 112,
      absent: 6,
      injured: 2,
      weather: 10,
      temperature: 18,
      aside7: 8,
      aside9: 1,
      indoor: 1,
    },
    {
      league: 'Tuesday Premier League',
      day: 'Tuesday',
      date: '19/01/2024',
      matches: 20,
      total: '£100',
      cancelled: 1,
      players: 160,
      absent: 8,
      injured: 3,
      weather: 8,
      temperature: 16,
      aside7: 10,
      aside9: 2,
      indoor: 0,
    },
    {
      league: 'Wednesday Champions League',
      day: 'Wednesday',
      date: '20/01/2024',
      matches: 24,
      total: '£120',
      cancelled: 2,
      players: 192,
      absent: 12,
      injured: 4,
      weather: 6,
      temperature: 20,
      aside7: 12,
      aside9: 3,
      indoor: 0,
    },
    {
      league: 'Thursday Europa League',
      day: 'Thursday',
      date: '21/01/2024',
      matches: 22,
      total: '£110',
      cancelled: 0,
      players: 176,
      absent: 10,
      injured: 5,
      weather: 7,
      temperature: 18,
      aside7: 11,
      aside9: 2,
      indoor: 0,
    },
    {
      league: 'Friday Night Lights',
      day: 'Friday',
      date: '22/01/2024',
      matches: 15,
      total: '£75',
      cancelled: 1,
      players: 120,
      absent: 5,
      injured: 2,
      weather: 9,
      temperature: 17,
      aside7: 7,
      aside9: 1,
      indoor: 0,
    },
    {
      league: 'Saturday Super Cup',
      day: 'Saturday',
      date: '23/01/2024',
      matches: 18,
      total: '£90',
      cancelled: 0,
      players: 144,
      absent: 6,
      injured: 3,
      weather: 8,
      temperature: 19,
      aside7: 9,
      aside9: 2,
      indoor: 0,
    },
    {
      league: 'Sunday League',
      day: 'Sunday',
      date: '24/01/2024',
      matches: 16,
      total: '£80',
      cancelled: 0,
      players: 128,
      absent: 4,
      injured: 1,
      weather: 10,
      temperature: 18,
      aside7: 8,
      aside9: 1,
      indoor: 1,
    },
    {
      league: 'Midweek Madness',
      day: 'Wednesday',
      date: '27/01/2024',
      matches: 25,
      total: '£125',
      cancelled: 2,
      players: 200,
      absent: 8,
      injured: 5,
      weather: 6,
      temperature: 21,
      aside7: 13,
      aside9: 3,
      indoor: 0,
    },
    {
      league: 'Weekend Warriors',
      day: 'Saturday',
      date: '30/01/2024',
      matches: 20,
      total: '£100',
      cancelled: 1,
      players: 160,
      absent: 6,
      injured: 2,
      weather: 9,
      temperature: 20,
      aside7: 10,
      aside9: 2,
      indoor: 0,
    },
  ];

  const handleExportToCsv = () => {
    startLoadingExport();

    // Prepare the bigCountBoxData section
    const bigCountBoxDataSection = [
      ['Games Oficiated', '28,031'],
      ['Balance Due', '£7385'],
      ['Balance Paid', '£0'],
      ['Unique Players', '533'],
    ];

    // Add a separator row
    const separatorRow = [''];

    // Prepare the main table data section
    const tableHeaders = [
      'League',
      'Day',
      'Date',
      'Matches',
      'Total',
      'Cancelled',
      'Players',
      'Absent',
      'Injured',
      'Weather',
      'Temperature',
      '7-aside',
      '9-aside',
      'Indoor',
    ];
    const tableDataSection = data.map((row) => [
      row.league,
      row.day,
      row.date,
      row.matches,
      row.total,
      row.cancelled,
      row.players,
      row.absent,
      row.injured,
      row.weather,
      row.temperature,
      row.aside7,
      row.aside9,
      row.indoor,
    ]);

    // Combine all sections
    const allData = [
      ...bigCountBoxDataSection,
      separatorRow,
      tableHeaders,
      ...tableDataSection,
    ];

    // Get the current date
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // Format date as YYYY-MM-DD

    // Define the filename with the date
    const filename = `venue_metrics_data_${formattedDate}.csv`;

    // Convert the combined data to CSV and export
    exportToCsv(allData, filename, () => {
      stopLoadingExport();
    });
  };

  return (
    <Layout>
      <div className={styles.dashboard}>
        <div className={styles.heading}>
          <div>
            <Image src="/assets/imgs/svgs/smLogo.svg" height={25} width={25} />
            <Breadcrumbs customValue={'Metrics'} />
          </div>
          <div>
            <GreenArrowButton
              text={isLoadingExport ? 'Exporting...' : 'Export to Excel'}
              onClick={handleExportToCsv}
              disabled={isLoadingExport}
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
              <div className={styles.details}>
                <div className={styles.boxes}>
                  <BigCountBox count="28,031" title="Games Oficiated" />
                  <BigCountBox
                    count="£7385"
                    title="Balance Due"
                    detail="Calculation: 1477 * £5"
                  />
                  <BigCountBox
                    count="£0"
                    title="Balance Paid"
                    detail="As of: 31/05/2024"
                  />
                  <BigCountBox count="533" title="Unique Players" />
                </div>
                <div className={styles.selectPeriod}>
                  <BigDropdown />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>League</th>
                      <th>Day</th>
                      <th>Date</th>
                      <th>Matches</th>
                      <th>Total</th>
                      <th>Cancelled</th>
                      <th>Players</th>
                      <th>Absent</th>
                      <th>Injured</th>
                      <th>Weather</th>
                      <th>Temperature</th>
                      <th>7-aside</th>
                      <th>9-aside</th>
                      <th>Indoor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index}>
                        <td>{row.league}</td>
                        <td>{row.day}</td>
                        <td>{row.date}</td>
                        <td>{row.matches}</td>
                        <td>{row.total}</td>
                        <td>{row.cancelled}</td>
                        <td>{row.players}</td>
                        <td>{row.absent}</td>
                        <td>{row.injured}</td>
                        <td>{row.weather}</td>
                        <td>{row.temperature}</td>
                        <td>{row.aside7}</td>
                        <td>{row.aside9}</td>
                        <td>{row.indoor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(VenueMetricsPage);
