import React, { useEffect } from 'react';
import {
  Container, Card, Col, Form, Row, Button,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import routes from '../routes/routes';
import useAuth from '../hooks/AuthHook';

function LoginPage() {
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
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn();
        navigate('/', { replace: true });
      } catch (err) {
        if (err.response.status === 401) {
          formik.errors.failLogin = true;
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
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('signIn.enter')}</h1>
                <div className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.failLogin}
                    value={formik.values.username}
                    name="username"
                    autoComplete="username"
                    required
                    autoFocus
                    placeholder={t('signIn.username')}
                    id="username"
                  />
                  <Form.Label htmlFor="username">{t('signIn.username')}</Form.Label>
                </div>
                <div className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.failLogin}
                    value={formik.values.password}
                    name="password"
                    autoComplete="password"
                    required
                    placeholder={t('signIn.password')}
                    id="password"
                  />
                  <Form.Label htmlFor="password">{t('signIn.password')}</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">{t('signIn.errors.failLogin')}</Form.Control.Feedback>

                </div>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('signIn.enter')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('signIn.getAccount')}
                  &nbsp;
                </span>
                <Link to="/signup">{t('signIn.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
