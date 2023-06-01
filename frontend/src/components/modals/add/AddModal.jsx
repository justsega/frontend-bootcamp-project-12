import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useSocket from '../../../hooks/SocketHook';
import 'react-toastify/dist/ReactToastify.css';
import toastConfig from '../../../toastConfig';
import getScheme from '../../../validationSchemes';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice';

const AddModal = (props) => {
  const { closeModal, show } = props;
  const inputField = useRef();
  useEffect(() => {
    inputField.current.focus();
  }, []);
  const channelsNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);
  const { t } = useTranslation();
  const socket = useSocket();
  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: getScheme.modalsScheme(Yup, t, channelsNames),
    onSubmit: (values) => {
      try {
        if (values.channelName.length === 0) {
          throw new Error(t('modals.notToBeEmpty'));
        }
        socket.addChannel(values.channelName);
        toast.success(t('toast.added'), toastConfig);
        formik.resetForm();
        closeModal();
      } catch (err) {
        toast.error(err.message, toastConfig);
        inputField.current.focus();
      }
    },
  });
  return (
    <Modal show={show} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            ref={inputField}
            type="text"
            autoComplete="off"
            isInvalid={formik.errors.channelName && formik.touched.channelName}
            name="channelName"
            id="channelName"
            className="mb-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channelName}
          />
          <Form.Label className="visually-hidden" htmlFor="channelName">{t('modals.addModal.label')}</Form.Label>
          <Form.Control.Feedback className="invalid-feedback">{formik.errors.channelName}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={closeModal} className="me-2">{t('modals.addModal.cancelBtn')}</Button>
            <Button variant="primary" onClick={formik.handleSubmit} type="submit">{t('modals.addModal.addBtn')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
