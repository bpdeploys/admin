import React from 'react';
import Link from 'next/link';
import styles from './sidebar.module.scss';
import { useAuth } from '../../../../context/useAuth';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <nav>
        <h4>Solutions</h4>
        <ul>
          <li>
            <Link href="/profile">Affiliate Marketing</Link>
          </li>
          <li>
            <Link href="/apps">Advertising</Link>
          </li>
          <li>
            <Link href="/about">Auction</Link>
          </li>
          <li>
            <Link href="/vacancies">Companies</Link>
          </li>
          <li>
            <Link href="/vacancies">Countries</Link>
          </li>
          <li>
            <Link href="/vacancies">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
