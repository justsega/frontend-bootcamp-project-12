import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
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
import RenameModalForm from './RenameModalForm';

const RenameModal = (props) => {
  useEffect(() => {
    const inputField = document.getElementById('channelName');
    inputField.focus();
  }, []);
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
        <RenameModalForm formik={formik} handleClose={handleClose} t={t} />
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
