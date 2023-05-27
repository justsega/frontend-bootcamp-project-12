import { Image } from 'react-bootstrap';

const MessagesInput = ({ formik, t }) => (
  <div className="mt-auto px-5 py-3">
    <form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input onChange={formik.handleChange} name="message" aria-label="Новое сообщение" placeholder={t('messagesPage.inputPlaceholder')} className="border-0 p-0 ps-2 form-control" value={formik.values.message} />
        <button type="submit" disabled="" className="btn btn-group-vertical">
          <Image src="sendMessage.svg" />
          <span className="visually-hidden">{t('messagesPage.sendBtn')}</span>
        </button>
      </div>
    </form>
  </div>
);

export default MessagesInput;
