import React from 'react';
import Modal from 'react-modal';
import Sheet from './Sheet'

import Player from './Tunes'

import './Modal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 0,
    cursor: 'pointer',
  },
  
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

let basePath = process.env.PUBLIC_URL || '.';
let imgPath = basePath + '/start.png'
let player = new Player();


function ModalComponent(props) {
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function closeModal() {
    // play a sound in the handler to initialize webaudio....
    player.playTrack();

    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <img id='shareBanner' alt='Get started...' src={imgPath} border="0" onClick={closeModal} />
      </Modal>
      <Sheet width="100%" player={player} />
    </div>
  );
}

export default ModalComponent;
