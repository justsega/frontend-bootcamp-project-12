import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSocket from '../../hooks/SocketHook';
import { selectors } from '../../slices/channelsSlice';
import 'react-toastify/dist/ReactToastify.css';
import toastConfig from '../../toastConfig';

const RenameModal = (props) => {
  const { t } = useTranslation();
  // eslint-disable-next-line react/prop-types
  const { handleClose, id } = props;
  const channelToRename = useSelector(selectors.selectAll).find((channel) => channel.id === id);
  const socket = useSocket();
  const Schema = Yup.object().shape({
    channelName: Yup.string().min(3, 'Too short').max(20, 'Too long'),

  });

  const formik = useFormik({
    initialValues: {
      channelName: channelToRename.name,
    },
    Schema,
    onSubmit: (values) => {
      toast.success(t('toast.renamed'), toastConfig);
      socket.renameChannel(id, values.channelName);
      // eslint-disable-next-line no-param-reassign
      values.channelName = '';
      handleClose();
    },
  });
  const inputField = useRef();
  useEffect(() => {
    inputField.current.select();
  }, []);

  return (
    <Modal
      show
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            ref={inputField}
            name="channelName"
            id="channelName"
            className="mb-2"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.channelName}
          />
          <Form.Label className="visually-hidden" htmlFor="channelName">{t('modals.renameModal.label')}</Form.Label>
          <div name="invalid" className="invalid-feedback" />
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">{t('modals.renameModal.cancelBtn')}</Button>
            <Button type="submit" variant="primary" onClick={formik.handleSubmit}>{t('modals.renameModal.renameBtn')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RenameModal;
