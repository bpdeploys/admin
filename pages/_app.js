import { ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';
import '../styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import { SquadProvider } from '../context/SquadContext';
import { AuthProvider } from '../context/useAuth';
import { Roboto } from 'next/font/google';
import { SportsmappProvider } from '../context/SportsmappContext';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SportsmappProvider>
        <ToastContainer />
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </SportsmappProvider>
    </AuthProvider>
  );
}

export default MyApp;
