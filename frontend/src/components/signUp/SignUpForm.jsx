import { Form, Button } from 'react-bootstrap';

const SignUpForm = ({ formik, t }) => (
  <Form className="w-50" onSubmit={formik.handleSubmit}>
    <h1 className="text-center mb-4">{t('signUp.title')}</h1>
    <Form.Floating className="mb-3">
      <Form.Control
        id="username"
        name="username"
        required
        autoFocus
        placeholder={t('signUp.username')}
        autoComplete="username"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        isInvalid={formik.errors.username && formik.touched.username}
      />
      <Form.Label htmlFor="username">{t('signUp.username')}</Form.Label>
      <Form.Control.Feedback type="invalid" placement="right" tooltip>{formik.errors.username}</Form.Control.Feedback>
    </Form.Floating>
    <Form.Floating className="mb-3">
      <Form.Control
        id="password"
        name="password"
        type="password"
        required
        placeholder={t('signUp.password')}
        autoComplete="new-password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        isInvalid={formik.errors.password && formik.touched.password}
      />
      <Form.Label htmlFor="password">{t('signUp.password')}</Form.Label>
      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
    </Form.Floating>
    <Form.Floating className="mb-4">
      <Form.Control
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        required
        placeholder={t('signUp.confirmPassword')}
        autoComplete="new-password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
      />
      <Form.Label htmlFor="confirmPassword">{t('signUp.confirmPassword')}</Form.Label>
      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>
    </Form.Floating>
    <Button type="submit" variant="outline-primary" className="w-100">{t('signUp.button')}</Button>
  </Form>
);

export default SignUpForm;
