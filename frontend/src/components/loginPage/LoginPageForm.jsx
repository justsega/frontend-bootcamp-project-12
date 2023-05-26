import React from 'react';
import { Form, FormFloating, Button } from 'react-bootstrap';
import InputComponent from '../InputComponent';

const LoginPageForm = ({ formik, t }) => (
  <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
    <h1 className="text-center mb-4">{t('signIn.enter')}</h1>
    <FormFloating className="mb-3">
      <InputComponent componentName="signIn" name="username" formik={formik} t={t} label />
    </FormFloating>
    <FormFloating className="mb-4">
      <InputComponent componentName="signIn" name="password" type="password" formik={formik} t={t} label feedBack />
    </FormFloating>
    <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('signIn.enter')}</Button>
  </Form>
);

export default LoginPageForm;
