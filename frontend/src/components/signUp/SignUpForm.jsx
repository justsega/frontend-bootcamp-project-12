import { Form, Button } from 'react-bootstrap';
import InputComponent from '../InputComponent';

const SignUpForm = ({ formik, t }) => (
  <Form className="w-50" onSubmit={formik.handleSubmit}>
    <h1 className="text-center mb-4">{t('signUp.title')}</h1>
    <Form.Floating className="mb-3">
      <InputComponent componentName="signUp" name="username" formik={formik} t={t} label feedBack />
    </Form.Floating>
    <Form.Floating className="mb-3">
      <InputComponent componentName="signUp" name="password" type="password" formik={formik} t={t} label feedBack />
    </Form.Floating>
    <Form.Floating className="mb-4">
      <InputComponent componentName="signUp" name="confirmPassword" type="password" formik={formik} t={t} label feedBack />
    </Form.Floating>
    <Button type="submit" variant="outline-primary" className="w-100">{t('signUp.button')}</Button>
  </Form>
);

export default SignUpForm;
