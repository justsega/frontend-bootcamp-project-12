import React, { useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/SocketHook';
import { actions as channelsActions } from '../../slices/channelsSlice';
import 'react-toastify/dist/ReactToastify.css';
import toastConfig from '../../toastConfig';

const RemoveModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.channels.activeChannelId);
  // eslint-disable-next-line react/prop-types
  const { handleClose, id } = props;
  const socket = useSocket();
  // eslint-disable-next-line no-shadow
  const handleRemove = (id) => {
    toast.success(t('toast.removed'), toastConfig);
    socket.removeChannel(id);
    if (id === currentId) {
      dispatch(channelsActions.activeChannelId(1));
    }
    handleClose();
  };
  const removeBtn = useRef();
  useEffect(() => {
    removeBtn.current.focus();
  }, []);
  return (
    <RenderRemovableModal
      handleClose={handleClose}
      handleRemove={handleRemove}
      t={t}
      id={id}
    />
  );
};

const RenderRemovableModal = ({
  handleClose, handleRemove, t, id,
}) => (
  <Modal show onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>{t('modals.removeModal.title')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{t('modals.removeModal.label')}</p>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={handleClose} className="me-2">{t('modals.removeModal.cancelBtn')}</Button>
        <Button id="remove-btn" type="submit" variant="danger" onClick={() => handleRemove(id)}>{t('modals.removeModal.removeBtn')}</Button>
      </div>
    </Modal.Body>
  </Modal>
);

export default RemoveModal;
