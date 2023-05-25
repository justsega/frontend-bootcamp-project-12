import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/SocketHook';
import 'react-toastify/dist/ReactToastify.css';
import toastConfig from '../../toastConfig';

function AddModal(props) {
  // eslint-disable-next-line react/prop-types
  const { handleClose } = props;
  const { t } = useTranslation();
  const socket = useSocket();
  const modalAddScheme = Yup.object().shape({
    channelName: Yup.string().min(3).max(20),

  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: modalAddScheme,
    onSubmit: (values) => {
      toast.success('Канал успешно добавлен', toastConfig);
      socket.addChannel(values.channelName);
      // eslint-disable-next-line no-param-reassign
      values.channelName = '';
      handleClose();
    },
  });
  return (
    <Modal
      show
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          isInvalid={formik.errors.channelName}
          name="channelName"
          id="channelName"
          className="mb-2"
          onChange={formik.handleChange}
          value={formik.values.channelName}
        />
        <Form.Label className="visually-hidden" htmlFor="channelName">{t('modals.addModal.label')}</Form.Label>
        <div name="invalid" className="invalid-feedback">{t('modals.addModal.error')}</div>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2">{t('modals.addModal.cancelBtn')}</Button>
          <Button type="submit" variant="primary" onClick={formik.handleSubmit}>{t('modals.addModal.addBtn')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddModal;
