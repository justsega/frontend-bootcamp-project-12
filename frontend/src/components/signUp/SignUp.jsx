import React from 'react';
import { useFormik } from 'formik';
import {
  Card, Col, Container, Image, Row,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes/routes';
import getScheme from '../../validationSchemes';
import useAuth from '../../hooks/AuthHook';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getScheme.signUp(Yup, t),
    onSubmit: async (values) => {
      const { confirmPassword, ...data } = values;
      try {
        const r = await axios.post(routes.signUp(), data);
        localStorage.setItem('userId', JSON.stringify(r.data));
        auth.logIn();
        navigate('/', { replace: true });
      } catch (err) {
        if (err.response.status === 409) {
          formik.errors.confirmPassword = t('signUp.errors.alreadyExist');
        }
      }
    },
  });
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image src="signupimg.jpg" roundedCircle alt={t('signUp.title')} />
              </div>
              <SignUpForm formik={formik} t={t} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
