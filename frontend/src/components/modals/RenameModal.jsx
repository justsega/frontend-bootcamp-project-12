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
import getScheme from '../../validationSchemes';

const RenameModal = (props) => {
  const { handleClose, id } = props;
  const { t } = useTranslation();

  const channelToRename = useSelector(selectors.selectAll).find((channel) => channel.id === id);
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {
      channelName: channelToRename.name,
    },
    validationSchema: getScheme.renameModal(Yup, t),
    onSubmit: (values) => {
      toast.success(t('toast.renamed'), toastConfig);
      socket.renameChannel(id, values.channelName);
      formik.resetForm();
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
            autoComplete="false"
            isInvalid={formik.errors.channelName}
            name="channelName"
            id="channelName"
            className="mb-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channelName}
            type="text"
            ref={inputField}
          />
          <Form.Label className="visually-hidden" htmlFor="channelName">{t('modals.renameModal.label')}</Form.Label>
          <div name="invalid" className="invalid-feedback">{t('modals.renameModal.error')}</div>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">{t('modals.renameModal.cancelBtn')}</Button>
            <Button type="submit" variant="primary" onClick={formik.handleSubmit}>{t('modals.renameModal.renameBtn')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
