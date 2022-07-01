import React from 'react';
import Modal from 'react-modal';

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

const imgStyle = {
    width: '480px',
    border: 0,
    background: 'white',
    color: 'black',
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

let basePath = process.env.PUBLIC_URL || '.';
let imgPath = basePath + '/start.png'


function ModalComponent(props) {
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <img style={imgStyle} alt='Get started...' src={imgPath} border="0" onClick={closeModal} />
      </Modal>
      {modalIsOpen || props.children}
    </div>
  );
}

export default ModalComponent;
