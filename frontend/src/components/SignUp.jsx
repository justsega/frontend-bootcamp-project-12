import React from 'react';
import {
  Button, Card, Container, Form, FormFloating, Image, Row,
} from 'react-bootstrap';

function SignUp() {
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
                <h1 className="text-center mb-4">Регистрация</h1>
                <FormFloating className="mb-3">
                  <Form.Control
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autocomplete="username"
                    required=""
                    id="username"
                    className="form-control is-invalid"
                    value=""
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <div className="invalid-tooltip">Обязательное поле</div>
                </FormFloating>

                <FormFloating className="mb-3">
                  <Form.Control
                    placeholder="Не менее 6 символов"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autocomplete="new-password"
                    type="password"
                    id="password"
                    className="form-control"
                    value=""
                  />
                  <div className="invalid-tooltip">Обязательное поле</div>
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                </FormFloating>
                <FormFloating className="mb-4">
                  <Form.Control
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    required=""
                    autocomplete="new-password"
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value=""
                  />
                  <div className="invalid-tooltip" />
                  <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                </FormFloating>
                <Button variant="outline-primary" type="submit" className="w-100">Зарегистрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
}

export default SignUp;
