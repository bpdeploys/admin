import React, { useState } from 'react';
import styles from './createpitchmodal.module.scss';
import TopModal from '../../Common/TopModal';
import { createPitch } from '../../../services';

const CreatePitchModal = ({
  showModal,
  toggleModal,
  selectedVenue,
  onPitchCreated,
}) => {
  const [name, setName] = useState('');
  const [format, setFormat] = useState('');
  const [surface, setSurface] = useState('');
  const [logo, setLogo] = useState(null);

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

  const handleCreatePitch = async () => {
    try {
      await createPitch({
        name,
        format_pitch: format,
        surface,
        venue: selectedVenue,
      });
      alert('Pitch created successfully');
      onPitchCreated();
    } catch (error) {
      alert('Error creating pitch');
    }
  };

  return (
    <TopModal
      show={showModal}
      modalClosed={toggleModal}
      title="Create New Pitch"
      zIndex={200}
      width="30vw"
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
            'Use Sports Provider Logo'
          )}
        </label>
        <input
          type="text"
          placeholder="Name of the Pitch"
          className={styles.inputField}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pitch format"
          className={styles.inputField}
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        />
        <input
          type="text"
          placeholder="What is the surface?"
          className={styles.inputField}
          value={surface}
          onChange={(e) => setSurface(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleCreatePitch}>
          Create Pitch
        </button>
      </div>
    </TopModal>
  );
};

export default CreatePitchModal;
