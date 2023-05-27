import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginPageForm = ({ formik, t }) => (
  <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
    <h1 className="text-center mb-4">{t('signIn.enter')}</h1>
    <Form.Floating className="mb-3">
      <Form.Control
        id="username"
        name="username"
        autoFocus
        placeholder={t('signIn.username')}
        autoComplete="username"
        onChange={formik.handleChange}
        value={formik.values.username}
        isInvalid={formik.errors.faildLogin && formik.touched.username}
      />
      <Form.Label htmlFor="username">{t('signIn.username')}</Form.Label>
    </Form.Floating>
    <Form.Floating className="mb-4">
      <Form.Control
        id="password"
        name="password"
        type="password"
        placeholder={t('signIn.password')}
        autoComplete="current-password"
        onChange={formik.handleChange}
        value={formik.values.password}
        isInvalid={formik.errors.faildLogin && formik.touched.password}
      />
      <Form.Label htmlFor="password">{t('signIn.password')}</Form.Label>
      <Form.Control.Feedback tooltip type="invalid">
        {formik.errors.faildLogin}
      </Form.Control.Feedback>
    </Form.Floating>
    <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('signIn.enter')}</Button>
  </Form>
);

export default LoginPageForm;
