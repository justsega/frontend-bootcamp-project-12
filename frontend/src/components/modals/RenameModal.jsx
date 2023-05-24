import { Modal, Button, Form } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from 'yup';
import useSocket from "../../hooks/SocketHook";
import { useSelector } from "react-redux";
import { selectors } from "../../slices/channelsSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RenameModal = (props) => {
    const {handleClose, id} = props
    const channelToRename = useSelector(selectors.selectAll).find((channel) => channel.id === id);
    const socket = useSocket();
    const Schema = Yup.object().shape({
        channelName: Yup.string().min(3, 'Too short').max(20, 'Too long'),
        
    })

    const formik = useFormik({
        initialValues: {
            channelName: channelToRename.name,
        },
        Schema,
        onSubmit: values => {
            toast.success('Канал успешно переименован', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
            console.log(values.channelName);
            socket.renameChannel(id, values.channelName)
            values.channelName = '';
            handleClose();
        },
    })
    return <>
        <Modal
            show
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Переименовать канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    //  isInvalid="invalid"
                    name="channelName"
                    id="channelName"
                    className="mb-2"
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.channelName} />
                <Form.Label className="visually-hidden" htmlFor="channelName">Имя канала</Form.Label>
                <div name="invalid" className="invalid-feedback"></div>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={handleClose} className="me-2">Отменить</Button>
                    <Button type="submit" variant="primary" onClick={formik.handleSubmit}>Отправить</Button>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default RenameModal;