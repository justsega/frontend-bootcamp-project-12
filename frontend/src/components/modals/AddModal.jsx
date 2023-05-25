import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/SocketHook';
import 'react-toastify/dist/ReactToastify.css';
import toastConfig from '../../toastConfig';

const AddModal = (props) => {
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
      toast.success(t('toast.added'), toastConfig);
      socket.addChannel(values.channelName);
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
        <Modal.Title>{t('modals.addModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
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
          <Form.Label className="visually-hidden" htmlFor="channelName">{t('modals.addModal.label')}</Form.Label>
          <div name="invalid" className="invalid-feedback">{t('modals.addModal.error')}</div>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">{t('modals.addModal.cancelBtn')}</Button>
            <Button type="submit" variant="primary" onClick={formik.handleSubmit}>{t('modals.addModal.addBtn')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddModal;
