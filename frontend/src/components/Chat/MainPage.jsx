import axios from "axios";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import routes from "../../routes/routes";
import Channels from "./Channels";
import Messages from "./Messages";


const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const MainPage = () => {
  useEffect(() => {
    (async () => {
      await axios.get(routes.getData(), { headers: getAuthHeader() })
    })()
  }, [])

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow" >
      <Row className="h-100 bg-white flex-md-row">
        <Channels channels={[]} />
        <Messages />
      </Row>
    </Container>

  );
}

export default MainPage;