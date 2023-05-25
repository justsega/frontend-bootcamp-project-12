import { useFormik } from 'formik';
import React from 'react';
import {
  Button, Card, Container, Form, FormFloating, Image, Row,
} from 'react-bootstrap';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

function SignUp() {
  const { t } = useTranslation();
  const signupValidation = Yup.object().shape({
    username: Yup
      .string()
      .trim()
      .min(3, t('signUp.errors.usernameLength'))
      .max(20, t('signUp.errors.usernameLength'))
      .required(t('signUp.errors.required')),
    password: Yup
      .string()
      .trim()
      .min(6, t('signUp.errors.passwordLength'))
      .required(t('signUp.errors.required')),
    confirmPassword: Yup
      .string()
      .trim()
      .oneOf([Yup.ref('password'), null], t('signUp.errors.passConfirm'))
      .required(t('signUp.errors.required')),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidation,
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
              <Form className="w-50">
                <h1 className="text-center mb-4">{t('signUp.title')}</h1>
                <FormFloating className="mb-3">
                  <Form.Control
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.username && formik.touched.username}
                    placeholder={t('signUp.username')}
                    name="username"
                    required=""
                    id="username"
                    value={formik.values.username}
                    autoFocus
                  />
                  <Form.Label htmlFor="username">{t('signUp.username')}</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </FormFloating>

                <FormFloating className="mb-3">
                  <Form.Control
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.password && formik.touched.password}
                    placeholder={t('signUp.password')}
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    type="password"
                    id="password"
                    value={formik.values.password}
                  />
                  <Form.Label htmlFor="password">{t('signUp.password')}</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FormFloating>
                <FormFloating className="mb-4">
                  <Form.Control
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
                    placeholder={t('signUp.passwordConfirmation')}
                    name="confirmPassword"
                    required=""
                    type="password"
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                  />
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">{t('signUp.passwordConfirmation')}</Form.Label>
                </FormFloating>
                <Button variant="outline-primary" type="submit" className="w-100">{t('signUp.signup')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
}

export default SignUp;
