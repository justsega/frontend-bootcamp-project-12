import { useEffect, useRef} from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';

const Schema = yup.object().shape({
    username: yup.string().min(2, 'Too short'),
    password: yup.string().min(6, 'Password should contains at least 6 symbols')
})


const LoginPage = () => {
    const inputField = useRef();

    useEffect(() => {
        inputField.current.focus()
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        Schema,
        onSubmit: values => {
            console.log(values);
            
        }

    });
    return <>
    <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
            <Card className="shadow-sm">
                <Card.Body className="row p-5">
                    <Col md='6' className="col-12 d-flex align-items-center justify-content-center">
                        <Card.Img src="loginImg.jpeg" alt="Вход" />
                    </Col>
                    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                            <h1 className='text-center mb-4'>Войти</h1>
                            <div className="form-floating mb-3">
                            <Form.Control
                                ref={inputField}
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                name="username"
                                autoComplete="username"
                                required
                                
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
                           <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
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
    </>
}

export default LoginPage;

