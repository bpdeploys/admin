import { ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';
import '../styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import { SquadProvider } from '../context/SquadContext';

// Font files can be colocated inside of `pages`
const futuraBook = localFont({ src: '../public/assets/fonts/futura-book.ttf' });

function MyApp({ Component, pageProps }) {
  return (
    <SquadProvider>
      <ToastContainer />
      <main className={futuraBook.className}>
        <Component {...pageProps} />
      </main>
    </SquadProvider>
  );
}

export default MyApp;
