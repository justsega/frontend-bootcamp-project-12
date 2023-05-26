import React from 'react';
import { useFormik } from 'formik';
import {
  Button, Card, Container, Form, FormFloating, Image, Row,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import InputComponent from './InputComponent';
import getScheme from '../validationSchemes';

const SignUp = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getScheme.signUp(Yup, t),
    onSubmit: (values) => {
      console.log(`${values}   Ehuu`);
    },
  });
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image src="signupimg.jpg" className="rounded-circle" alt="Регистрация" />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signUp.title')}</h1>
                <FormFloating className="mb-3">
                  <InputComponent componentName="signUp" name="username" formik={formik} t={t} label feedBack />
                </FormFloating>
                <FormFloating className="mb-3">
                  <InputComponent componentName="signUp" name="password" type="password" formik={formik} t={t} label feedBack />
                </FormFloating>
                <FormFloating className="mb-4">
                  <InputComponent componentName="signUp" name="confirmPassword" type="password" formik={formik} t={t} label feedBack />
                </FormFloating>
                <Button variant="outline-primary" type="submit" className="w-100">{t('signUp.signup')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default SignUp;
