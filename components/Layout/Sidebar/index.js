import React from 'react';
import Link from 'next/link';
import styles from './sidebar.module.scss';
import { useAuth } from '../../../context/useAuth';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <nav>
        <h4>Settings</h4>
        <ul>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/apps">Apps</Link>
          </li>
          <li>
            <Link href="/about">About Baller Inc</Link>
          </li>
          <li>
            <Link href="/vacancies">Vacancies</Link>
          </li>
          <li>
            <div onClick={() => logout()}>Sign Out</div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
