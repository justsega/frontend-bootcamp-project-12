import React, { useEffect } from 'react';
import {
  Container, Card, Col, Form, Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../routes/routes';
import useAuth from '../hooks/AuthHook';

const Schema = Yup.object().shape({
  username: Yup.string().min(2, 'Too short'),
  password: Yup.string().min(6, 'Password should contains at least 6 symbols'),
});

function LoginPage() {
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
    Schema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn();
        navigate('/', { replace: true });
      } catch (err) {
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
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    autoComplete="username"
                    required
                    autoFocus
                    placeholder="Ваш ник"
                    id="username"
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                </div>
                <div className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    autoComplete="password"
                    required
                    placeholder="Ваш ник"
                    id="password"
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <div className="invalid-tooltip active">Неверные имя пользователя или пароль</div>
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
