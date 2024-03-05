import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import Modal from 'react-modal';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const Contact = ({ contact: { name, number, id } }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = ' #212572;';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={css.contact}>
      <div className={css.text}>
        <p>
          <FaUser /> {name}
        </p>
        <p>
          <FaPhone /> {number}
        </p>
      </div>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        // className={css.btn}
        onClick={openModal}
      >
        Delete
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>
          Do you really want to delete this contact?
        </h2>
        <Button variant="contained" onClick={handleDelete}>
          Yes, delete!
        </Button>
      </Modal>
    </div>
  );
};

export default Contact;
