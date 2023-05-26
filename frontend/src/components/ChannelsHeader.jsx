import { Button, Image } from 'react-bootstrap';

const ChannelsHeader = ({ showModal, t }) => (
  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
    <b>{t('channelsPage.channelsTitle')}</b>
    <Button variant="" onClick={() => showModal('add')} className="text-primary p-0 btn btn-group-vertical">
      <Image src="plus-square.svg" alt="add channel" className="btn-primary" />
      <span className="visually-hidden">+</span>
    </Button>
  </div>
);

export default ChannelsHeader;
