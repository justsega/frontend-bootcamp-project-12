import axios from 'axios';

const makeRequest = async (route, data, auth, navigate, formik, t) => {
  try {
    const r = await axios.post(route, data);
    localStorage.setItem('userId', JSON.stringify(r.data));
    auth.logIn();
    navigate('/', { replace: true });
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
