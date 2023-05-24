import { useSelector } from "react-redux";
import { selectors } from "../../slices/messagesSlice";
import useSocket from "../../hooks/SocketHook";
import { useFormik } from "formik";
import useAuth from "../../hooks/AuthHook";
import { Col } from "react-bootstrap";
import filter from 'leo-profanity';

const Messages = () => {
    filter.loadDictionary('ru')
    filter.loadDictionary('en')
    const username = useAuth().getUserName()
    const { activeChannelId } = useSelector(state => state.channels)
    const messages = useSelector(selectors.selectAll).filter((message) => message.channelId === activeChannelId);
    const socket = useSocket();
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: values => {
            socket.addMessage(filter.clean(values.message), activeChannelId, username)
            values.message = '';
           
        }
    })

    return (
        <Col className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0"><b># general</b></p>
                    <span className="text-muted">{messages.length} сообщения</span>
                </div>
                <div  id="messages-box" className="chat-messages overflow-auto px-5 ">
                {messages.map((message) => {
                     return <div key={message.id} className="text-break mb-2"><b>{message.username}</b>: {message.body}</div>
                })}
                </div>
                <div className="mt-auto px-5 py-3">
                    <form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
                        <div className="input-group has-validation">
                            <input onChange={formik.handleChange} name="message" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value={formik.values.message} />
                            <button  type="submit" disabled="" className="btn btn-group-vertical">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                                </svg>
                                <span className="visually-hidden">Отправить</span></button>
                        </div>
                    </form>
                </div>
            </div>
        </Col>
    );
}

export default Messages;