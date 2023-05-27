import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AddModalForm = ({ formik, handleClose, t }) => (
  <Form onSubmit={formik.handleSubmit}>
    <Form.Control
      type="text"
      autoComplete="false"
      isInvalid={formik.errors.channelName}
      name="channelName"
      id="channelName"
      className="mb-2"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.channelName}
    />
    <Form.Label className="visually-hidden" htmlFor="channelName">{t('modals.addModal.label')}</Form.Label>
    <Form.Control.Feedback className="invalid-feedback">{t('modals.addModal.error')}</Form.Control.Feedback>
    <div className="d-flex justify-content-end">
      <Button variant="secondary" onClick={handleClose} className="me-2">{t('modals.addModal.cancelBtn')}</Button>
      <Button variant="primary" onClick={formik.handleSubmit} type="submit">{t('modals.addModal.addBtn')}</Button>
    </div>
  </Form>
);
export default AddModalForm;
