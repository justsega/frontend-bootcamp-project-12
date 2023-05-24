import { Modal, Button, Form } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from 'yup';
import useSocket from "../../hooks/SocketHook";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddModal = (props) => {
    const { handleClose } = props
    const socket = useSocket();
    const Schema = Yup.object().shape({
        channelName: Yup.string().min(3).max(20),
        
    })

    const formik = useFormik({
        initialValues: {
            channelName: '',
        },
        Schema,
        onSubmit: values => {
            
            toast.success('Канал успешно добавлен', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
            socket.addChannel(values.channelName)
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
                <Modal.Title>Добавить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
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
                    <Button type="submit" variant="primary" onClick={formik.handleSubmit}>Добавить</Button>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default AddModal;