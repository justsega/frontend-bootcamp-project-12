export default {
  translation: {
    mainTitle: 'Hexlet Chat',
    signUp: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      signup: 'Зарегистрироваться',
      errors: {
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passConfirm: 'Пароли должны совпадать',
        required: 'Обязательное поле',
      },
    },
    signIn: {
      username: 'Ваш ник',
      password: 'Пароль',
      enter: 'Войти',
      registration: 'Регистрация',
      getAccount: 'Нет аккаунта?',
      errors: {
        failLogin: 'Неверные имя пользователя или пароль',
      },
    },
    logOutBtn: 'Выйти',
    channelsPage: {
      channelsTitle: 'Каналы',
      messagesCounter: {
        messages_one: '{{count}} сообщение',
        messages_few: '{{count}} сообщения',
        messages_many: '{{count}} сообщений',
      },
      dropDown: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },

    },
    messagesPage: {
      inputPlaceholder: 'Введите сообщение...',
      sendBtn: 'Отправить',
    },
    modals: {
      addModal: {
        title: 'Добавить канал',
        label: 'Имя канала',
        cancelBtn: 'Отменить',
        addBtn: 'Добавить',
        error: 'От 3 до 20 символов',
      },
      removeModal: {
        title: 'Удалить канал',
        label: 'Уверены?',
        cancelBtn: 'Отменить',
        removeBtn: 'Удалить',
      },
      renameModal: {
        title: 'Переименовать канал',
        label: 'Имя канала',
        cancelBtn: 'Отменить',
        renameBtn: 'Отправить',
      },
    },
  },
};
