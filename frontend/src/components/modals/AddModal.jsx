import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/SocketHook';
import 'react-toastify/dist/ReactToastify.css';
import toastConfig from '../../toastConfig';
import getScheme from '../../validationSchemes';
import AddModalForm from './AddModalForm';

const AddModal = (props) => {
  useEffect(() => {
    const inputField = document.getElementById('channelName');
    inputField.focus();
  });
  const { handleClose } = props;
  const { t } = useTranslation();
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: getScheme.modalAdd(Yup, t),
    onSubmit: (values) => {
      toast.success(t('toast.added'), toastConfig);
      socket.addChannel(values.channelName);
      formik.resetForm();
      handleClose();
    },
  });
  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddModalForm formik={formik} handleClose={handleClose} t={t} />
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
