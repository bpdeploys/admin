import React, { useState } from 'react';
import Modal from '../../Common/Modal';
import { createProvider } from '../../../services';
import styles from './companymodal.module.scss';
import { useLoading } from '../../../utils/hooks/useLoading';
import Image from 'next/image';

const CompanyModal = ({ showModal, toggleModal, onProviderCreated }) => {
  // Accept onProviderCreated prop
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');

  const { isLoading, startLoading, stopLoading } = useLoading();

  const categories = [
    'Beauty & Spas',
    'Local Deals',
    'Personal Services',
    'Health & Fitness',
    'Food & Drink',
    'Automotive',
    'Retail',
    'Things To Do',
    'Home Improvement',
  ];

  // Inside your CompanyModal component
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(selectedCategories);

  const handleSubmit = async () => {
    startLoading();

    try {
      // Create the provider object
      const provider = {
        name,
        type: 'League Provider',
        service: 'Paid2',
        // country,
        // address,
        // website,
        // logo
      };

      await createProvider(provider);
      onProviderCreated();
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  return (
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title="Create New Company"
    >
      <div className={styles.container}>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          style={{ display: 'none' }}
          id="logo-upload"
        />
        <label htmlFor="logo-upload" className={styles.logoButton}>
          {logo ? (
            <img src={logo} alt="Logo" className={styles.logoImage} />
          ) : (
            'Add Logo'
          )}
        </label>
        <input
          type="text"
          placeholder="Company Name"
          className={styles.inputField}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sector"
          className={styles.inputField}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          className={styles.inputField}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Head Office"
          className={styles.inputField}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input
          type="text"
          placeholder="Website"
          className={styles.inputField}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategories.includes(category) ? styles.selected : ''
              }`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Image
              src="/assets/imgs/svgs/LoadingIcon.svg"
              alt="Loading"
              width={16}
              height={16}
            />
          ) : (
            'Create Company'
          )}
        </button>
      </div>
    </Modal>
  );
};

export default CompanyModal;
