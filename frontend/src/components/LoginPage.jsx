import React, { useEffect } from 'react';
import {
  Container, Card, Col, Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import routes from '../routes/routes';
import useAuth from '../hooks/AuthHook';
import getScheme from '../validationSchemes';
import LoginPageForm from './LoginPageForm';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const checkAuth = () => {
      if (localStorage.getItem('userId')) {
        auth.logIn();
        navigate('/', { replace: true });
      }
    };
    checkAuth();
  }, [auth, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: getScheme.login(Yup),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn();
        navigate('/', { replace: true });
      } catch (err) {
        if (err.response.status === 401) {
          formik.errors.username = true;
          formik.errors.password = t('signIn.errors.password');
        }
        formik.setSubmitting(false);
        navigate('/login', { replace: true });
      }
    },

  });
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md="6" className="col-12 d-flex align-items-center justify-content-center">
                <Card.Img src="loginImg.jpeg" alt="Вход" />
              </Col>
              <LoginPageForm formik={formik} t={t} />
            </Card.Body>
            <Card.Footer className="p-4">
              <Card.Text className="text-center">
                {t('signIn.getAccount')}
                  &nbsp;
                <Link to="/signup">{t('signIn.registration')}</Link>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
