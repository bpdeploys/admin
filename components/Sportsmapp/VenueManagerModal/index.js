import React, { useState, useEffect } from 'react';
import Modal from '../../Common/Modal';
import styles from './venuesmodal.module.scss';
import GreenArrowButton from '../GreenArrowBtn';
import ButtonBox from '../../Common/ButtonBox';
import EditVenueManagerModal from '../EditVenueManagerModal';
import CreateVenueManagerModal from '../CreateVenueManagerModal';

const VenueManagerModal = ({
  showModal,
  toggleModal,
  selectedVenue,
  vmsData,
  refetchVms,
}) => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [selectedVm, setSelectedVm] = useState(null);

  const toggleCreationModal = () => {
    setShowCreationModal(!showCreationModal);
  };

  const handleVmCreate = () => {
    refetchVms();
    toggleCreationModal();
  };

  const handleVmEdit = () => {
    refetchVms();
    setSelectedVm(null);
  };

  return (
    <Modal
      show={showModal}
      modalClosed={toggleModal}
      title={`${vmsData?.length || 0} Venue Managers`}
      width="50%"
      hideActions={showCreationModal || selectedVm}
    >
      <div className={styles.container}>
        {showCreationModal && (
          <CreateVenueManagerModal
            showModal={showCreationModal}
            toggleModal={toggleCreationModal}
            selectedVenue={selectedVenue}
            onVmCreated={handleVmCreate}
          />
        )}
        {selectedVm && (
          <EditVenueManagerModal
            showModal={true}
            toggleModal={() => setSelectedVm(null)}
            selectedVm={selectedVm}
            onVmEdited={handleVmEdit}
          />
        )}
        <GreenArrowButton
          text="Create New VM"
          onClick={() => toggleCreationModal()}
        />
        <div className={styles.boxes}>
          {vmsData &&
            vmsData.map((vm, index) => (
              <ButtonBox
                key={index}
                title={`${vm.user.first_name} ${vm.user.last_name}`}
                action="Edit"
                onClick={() => setSelectedVm(vm)}
              />
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default VenueManagerModal;
