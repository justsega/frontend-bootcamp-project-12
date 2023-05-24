import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSocket from '../../hooks/SocketHook';
import { actions as channelsActions } from '../../slices/channelsSlice';
import 'react-toastify/dist/ReactToastify.css';

function RemoveModal(props) {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.channels.activeChannelId);
  // eslint-disable-next-line react/prop-types
  const { handleClose, id } = props;
  const socket = useSocket();
  // eslint-disable-next-line no-shadow
  const handleRemove = (id) => {
    toast.success('Канал успешно удален', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    socket.removeChannel(id);
    if (id === currentId) {
      dispatch(channelsActions.activeChannelId(1));
    }
    handleClose();
  };
  return (
    <Modal
      show
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2">Отменить</Button>
          <Button type="submit" variant="danger" onClick={() => handleRemove(id)}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveModal;
