import React from 'react';
import { Form, Button } from 'react-bootstrap';

const RenameModalForm = ({ formik, handleClose, t }) => (
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
    />
    <Form.Label className="visually-hidden" htmlFor="channelName">{t('modals.renameModal.label')}</Form.Label>
    <Form.Control.Feedback type="invalid">{t('modals.renameModal.error')}</Form.Control.Feedback>
    <div className="d-flex justify-content-end">
      <Button variant="secondary" onClick={handleClose} className="me-2">{t('modals.renameModal.cancelBtn')}</Button>
      <Button type="submit" variant="primary" onClick={formik.handleSubmit}>{t('modals.renameModal.renameBtn')}</Button>
    </div>
  </Form>
);

export default RenameModalForm;
