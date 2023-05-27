import React, { useEffect } from 'react';
import {
  Container, Card, Col, Row, Image,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/AuthHook';
import LoginPageForm from './LoginPageForm';
import makeRequest from '../../makeRequest';

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
    onSubmit: async (values) => {
      await makeRequest('loginPath', values, auth, navigate, formik, t);
    },

  });
  return <RenderLoginPage formik={formik} t={t} />;
};

const RenderLoginPage = ({ formik, t }) => (
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

export default LoginPage;
