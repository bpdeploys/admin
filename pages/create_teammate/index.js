import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Input from '../../components/Common/Input';
import Dropdown from '../../components/Common/Dropdown';
import Button from '../../components/Common/Button';

// Data
import constants from '../../utils/data/constants';

// Icons & Images
import BpLogo from '../../public/assets/imgs/svgs/homeLogo.svg';

// Styles
import styles from './createteammate.module.scss';
import { useFormData } from '../../services/context';
import useYupValidationResolver from '../../utils/hooks/useYupValidationResolver';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  gender: Yup.string().required('Gender is required'),
});

export default function CreateTeammate() {
  const router = useRouter();
  const { setFormValues } = useFormData();
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, setValue } = useForm({
    resolver,
  });

  const onSubmit = async (data) => {
    setFormValues(data);
    router.push('/select_profile');
  };

  const onError = (errors) => {
    // Error handling code
  };

  const pickContacts = async () => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const properties = ['name', 'tel'];
        const contacts = await navigator.contacts.select(properties, {
          multiple: false,
        });
        if (contacts && contacts[0]) {
          const contact = contacts[0];
          setValue('firstName', contact.name[0].split(' ')[0]);
          setValue('lastName', contact.name[0].split(' ')[1]);
          setValue('phoneNumber', contact.tel[0]);
        }
      } catch (error) {
        toast.error('Failed to pick contact');
      }
    } else {
      toast.error('We cant use contacts on this device');
    }
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white">
        <div className={styles.heading}>
          <h1>CREATE YOUR TEAMMATE</h1>
          <svg
            width="69"
            height="80"
            viewBox="0 0 69 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.5719 0L0.0798001 18.1445V61.2044L0 61.2548L0.0798001 61.2974V61.3911L0.16027 61.3403L34.5428 79.6721L68.0349 61.5277V18.4677L68.1147 18.4173L68.0349 18.3748V18.281L67.9544 18.3319L33.5719 0Z"
              fill="#125B9F"
            />
            <g filter="url(#filter0_d_356_576)">
              <mask id="path-2-inside-1_356_576" fill="white">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M45.7525 21.8797L45.7586 21.8734L54.7074 31.1685L54.7302 31.1448L56.9948 33.4971L50.201 40.5539L48.046 38.3155L48.0232 38.3392L45.7525 35.9806V55.1393H34.2242V55.1395H22.6947V35.9911L20.4341 38.3392L20.4113 38.3156L18.2562 40.5541L11.4624 33.4973L13.727 31.145L13.7498 31.1687L22.6947 21.8776V21.8735H22.6986L22.6987 21.8734L22.6988 21.8735H29.0679L31.3418 24.5681L34.2235 27.8606L37.1053 24.5679L39.3792 21.8734H45.7525V21.8797Z"
                />
              </mask>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M45.7525 21.8797L45.7586 21.8734L54.7074 31.1685L54.7302 31.1448L56.9948 33.4971L50.201 40.5539L48.046 38.3155L48.0232 38.3392L45.7525 35.9806V55.1393H34.2242V55.1395H22.6947V35.9911L20.4341 38.3392L20.4113 38.3156L18.2562 40.5541L11.4624 33.4973L13.727 31.145L13.7498 31.1687L22.6947 21.8776V21.8735H22.6986L22.6987 21.8734L22.6988 21.8735H29.0679L31.3418 24.5681L34.2235 27.8606L37.1053 24.5679L39.3792 21.8734H45.7525V21.8797Z"
                fill="white"
              />
              <path
                d="M45.7586 21.8734L46.1188 21.5266L45.7586 21.1524L45.3984 21.5266L45.7586 21.8734ZM45.7525 21.8797H45.2525V23.1199L46.1127 22.2264L45.7525 21.8797ZM54.7074 31.1685L54.3472 31.5153L54.7074 31.8895L55.0676 31.5153L54.7074 31.1685ZM54.7302 31.1448L55.0904 30.7981L54.7302 30.4239L54.37 30.7981L54.7302 31.1448ZM56.9948 33.4971L57.355 33.8439L57.6889 33.4971L57.355 33.1503L56.9948 33.4971ZM50.201 40.5539L49.8408 40.9006L50.201 41.2748L50.5612 40.9006L50.201 40.5539ZM48.046 38.3155L48.4062 37.9687L48.046 37.5945L47.6858 37.9687L48.046 38.3155ZM48.0232 38.3392L47.663 38.6859L48.0232 39.0601L48.3834 38.6859L48.0232 38.3392ZM45.7525 35.9806L46.1127 35.6338L45.2525 34.7403V35.9806H45.7525ZM45.7525 55.1393V55.6393H46.2525V55.1393H45.7525ZM34.2242 55.1393V54.6393H33.7242V55.1393H34.2242ZM34.2242 55.1395V55.6395H34.7242V55.1395H34.2242ZM22.6947 55.1395H22.1947V55.6395H22.6947V55.1395ZM22.6947 35.9911H23.1947V34.7509L22.3345 35.6443L22.6947 35.9911ZM20.4341 38.3392L20.0739 38.686L20.4341 39.0601L20.7943 38.686L20.4341 38.3392ZM20.4113 38.3156L20.7715 37.9688L20.4113 37.5947L20.0511 37.9688L20.4113 38.3156ZM18.2562 40.5541L17.896 40.9008L18.2562 41.275L18.6164 40.9008L18.2562 40.5541ZM11.4624 33.4973L11.1022 33.1505L10.7683 33.4973L11.1022 33.8441L11.4624 33.4973ZM13.727 31.145L14.0872 30.7982L13.727 30.4241L13.3668 30.7982L13.727 31.145ZM13.7498 31.1687L13.3896 31.5154L13.7498 31.8896L14.11 31.5154L13.7498 31.1687ZM22.6947 21.8776L23.0549 22.2244L23.1947 22.0791V21.8776H22.6947ZM22.6947 21.8735V21.3735H22.1947V21.8735H22.6947ZM22.6986 21.8735V22.3735H22.9117L23.0593 22.2197L22.6986 21.8735ZM22.6987 21.8734L23.0594 21.5272L22.6987 21.1513L22.3379 21.5272L22.6987 21.8734ZM22.6988 21.8735L22.3381 22.2197L22.4856 22.3735H22.6988V21.8735ZM29.0679 21.8735L29.45 21.551L29.3002 21.3735H29.0679V21.8735ZM31.3418 24.5681L30.9596 24.8906L30.9656 24.8974L31.3418 24.5681ZM34.2235 27.8606L33.8472 28.1899L34.2235 28.6198L34.5997 28.1899L34.2235 27.8606ZM37.1053 24.5679L37.4816 24.8972L37.4874 24.8904L37.1053 24.5679ZM39.3792 21.8734V21.3734H39.1469L38.9971 21.5509L39.3792 21.8734ZM45.7525 21.8734H46.2525V21.3734H45.7525V21.8734ZM45.3984 21.5266L45.3923 21.5329L46.1127 22.2264L46.1188 22.2201L45.3984 21.5266ZM55.0676 30.8218L46.1188 21.5266L45.3984 22.2201L54.3472 31.5153L55.0676 30.8218ZM54.37 30.7981L54.3472 30.8218L55.0676 31.5153L55.0904 31.4916L54.37 30.7981ZM57.355 33.1503L55.0904 30.7981L54.37 31.4916L56.6346 33.8439L57.355 33.1503ZM50.5612 40.9006L57.355 33.8439L56.6346 33.1503L49.8408 40.2071L50.5612 40.9006ZM47.6858 38.6622L49.8408 40.9006L50.5612 40.2071L48.4062 37.9687L47.6858 38.6622ZM48.3834 38.6859L48.4062 38.6622L47.6858 37.9687L47.663 37.9924L48.3834 38.6859ZM45.3923 36.3274L47.663 38.6859L48.3834 37.9924L46.1127 35.6338L45.3923 36.3274ZM45.2525 35.9806V55.1393H46.2525V35.9806H45.2525ZM45.7525 54.6393H34.2242V55.6393H45.7525V54.6393ZM33.7242 55.1393V55.1395H34.7242V55.1393H33.7242ZM34.2242 54.6395H22.6947V55.6395H34.2242V54.6395ZM23.1947 55.1395V35.9911H22.1947V55.1395H23.1947ZM22.3345 35.6443L20.0739 37.9924L20.7943 38.686L23.0549 36.3379L22.3345 35.6443ZM20.7943 37.9924L20.7715 37.9688L20.0511 38.6624L20.0739 38.686L20.7943 37.9924ZM20.0511 37.9688L17.896 40.2073L18.6164 40.9008L20.7715 38.6624L20.0511 37.9688ZM18.6164 40.2073L11.8226 33.1505L11.1022 33.8441L17.896 40.9008L18.6164 40.2073ZM11.8226 33.8441L14.0872 31.4918L13.3668 30.7982L11.1022 33.1505L11.8226 33.8441ZM13.3668 31.4918L13.3896 31.5154L14.11 30.8219L14.0872 30.7982L13.3668 31.4918ZM14.11 31.5154L23.0549 22.2244L22.3345 21.5308L13.3896 30.8219L14.11 31.5154ZM23.1947 21.8776V21.8735H22.1947V21.8776H23.1947ZM22.6947 22.3735H22.6986V21.3735H22.6947V22.3735ZM23.0593 22.2197L23.0594 22.2196L22.3379 21.5272L22.3378 21.5273L23.0593 22.2197ZM22.3379 22.2196L22.3381 22.2197L23.0595 21.5273L23.0594 21.5272L22.3379 22.2196ZM22.6988 22.3735H29.0679V21.3735H22.6988V22.3735ZM28.6858 22.196L30.9597 24.8905L31.7239 24.2456L29.45 21.551L28.6858 22.196ZM30.9656 24.8974L33.8472 28.1899L34.5997 27.5313L31.7181 24.2388L30.9656 24.8974ZM34.5997 28.1899L37.4816 24.8972L36.7291 24.2386L33.8472 27.5313L34.5997 28.1899ZM37.4874 24.8904L39.7613 22.1958L38.9971 21.5509L36.7232 24.2454L37.4874 24.8904ZM39.3792 22.3734H45.7525V21.3734H39.3792V22.3734ZM45.2525 21.8734V21.8797H46.2525V21.8734H45.2525Z"
                fill="black"
                mask="url(#path-2-inside-1_356_576)"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_356_576"
                x="7.4624"
                y="21.8734"
                width="53.5322"
                height="41.2661"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_356_576"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_356_576"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <form
          className={styles.createTeammate}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={styles.createTeammate__inputs}>
            <Input
              type="text"
              name="firstName"
              placeholder="First name"
              {...register('firstName')}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last name"
              {...register('lastName')}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              {...register('email')}
            />
            <Input
              type="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              {...register('phoneNumber')}
            />
          </div>
          <div className={styles.createTeammate__button}>
            <Button
              type="button"
              onClick={pickContacts}
              text="Test import"
              color="green"
              uppercase
            />
            <Button
              type="submit"
              text="Create Teammate"
              color="blue"
              uppercase
            />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}
