import axios from "axios";
import { getAuthHeader } from "../../providers/AuthProvider";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import routes from "../../routes/routes";
import Channels from "./Channels";
import Messages from "./Messages";
import { useDispatch } from "react-redux";
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';
import { ToastContainer } from 'react-toastify';

const MainPage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async () => {
      const { data } =  await axios.get(routes.getData(), { headers: getAuthHeader() });
      dispatch(channelsActions.addChannels(data.channels));
      dispatch(channelsActions.activeChannelId(data.currentChannelId));
      dispatch(messagesActions.addMessages(data.messages))
      
    })()
  }, [])


  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        <ToastContainer />
      </Row>
    </Container>

  );
}

export default MainPage;