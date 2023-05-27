import React, { useEffect } from 'react';
import {
  Container, Card, Col, Row, Image,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import routes from '../../routes/routes';
import useAuth from '../../hooks/AuthHook';

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
      faildLogin: false,
    },
    // validationSchema: getScheme.login(Yup),
    onSubmit: async (values) => {
      const { faildLogin, ...data } = values;
      try {
        const r = await axios.post(routes.loginPath(), data);
        localStorage.setItem('userId', JSON.stringify(r.data));
        auth.logIn();
        navigate('/', { replace: true });
      } catch (err) {
        if (err.response.status === 401) {
          formik.errors.faildLogin = t('signIn.errors.password');
        }
      }
    },

  });
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src="loginImg.jpeg" roundedCircle alt={t('signIn.enter')} />
              </Col>
              <LoginPageForm formik={formik} t={t} />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('signIn.getAccount')}</span>
                &nbsp;
                <Link to="/signup">{t('signIn.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
