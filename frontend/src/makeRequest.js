import axios from 'axios';
import routes from './routes/routes';

const makeRequest = async (routeType, values, auth, navigate, formik, t) => {
  try {
    const { username, password } = values;
    const route = routes[routeType]();
    console.log(route);
    const r = await axios.post(route, { username, password });
    localStorage.setItem('userId', JSON.stringify(r.data));
    auth.logIn();
    navigate('/', { replace: true });
    console.log(r.data);
  } catch (err) {
    if (err.response.status === 409) {
      // eslint-disable-next-line no-param-reassign
      formik.errors.confirmPassword = t('signUp.errors.alreadyExist');
    }
    if (err.response.status === 401) {
      // eslint-disable-next-line no-param-reassign
      formik.errors.faildLogin = t('signIn.errors.password');
    }
    console.log(err);
  }
};

export default makeRequest;
