const getScheme = {
  signUp: (Yup, t) => (
    Yup.object().shape({
      username: Yup
        .string()
        .trim()
        .min(3, t('signUp.errors.usernameLength'))
        .max(20, t('signUp.errors.usernameLength'))
        .required(t('signUp.errors.required')),
      password: Yup
        .string()
        .trim()
        .min(6, t('signUp.errors.passwordLength'))
        .required(t('signUp.errors.required')),
      confirmPassword: Yup
        .string()
        .trim()
        .oneOf([Yup.ref('password'), null], t('signUp.errors.passConfirm'))
        .required(t('signUp.errors.required')),
    })
  ),
  login: (Yup) => (
    Yup.object().shape({
      username: Yup.string().trim(),
      password: Yup.string().trim(),
    })
  ),
  modalsScheme: (Yup, t) => (
    Yup.object().shape({
      channelName: Yup.string().min(3, t('modals.addModal.error')).max(20, t('modals.addModal.error')),
    })
  ),

};

export default getScheme;
