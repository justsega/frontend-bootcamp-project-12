import React, { useState } from 'react';
import {
  Col, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions as channelsActions } from '../../slices/channelsSlice';
import getModal from '../modals/index';
import ChannelsHeader from './ChannelsHeader';
import { UnRemovableBtn, RemovableBtn } from './ChannelsButtons';

const renderModal = (modalInfo, closeModal) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return <Component handleClose={closeModal} id={modalInfo.id} />;
};

const Channels = () => {
  const { t } = useTranslation();
  const [modalInfo, setModalInfo] = useState({ type: null, id: null });

  // eslint-disable-next-line no-shadow
  const showModal = (modalInfo, id = null) => setModalInfo({ type: modalInfo, id });
  const closeModal = () => setModalInfo({ type: null, id: null });

  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);

  const { activeChannelId } = useSelector((state) => state.channels);
  const setCurrChannel = (id) => dispatch(channelsActions.activeChannelId(id));

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader showModal={showModal} t={t} />
      <Nav as="ul" fill className="flex-column nav-pills px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
        {channels.map((ch) => {
          const variant = ch.id === activeChannelId ? 'secondary' : null;
          return (
            <Nav.Item as="li" key={ch.id} className="w-100">
              {!ch.removable
                ? (
                  <UnRemovableBtn
                    name={ch.name}
                    setCurrChannel={setCurrChannel}
                    id={ch.id}
                    variant={variant}
                  />
                )
                : (
                  <RemovableBtn
                    name={ch.name}
                    setCurrChannel={setCurrChannel}
                    id={ch.id}
                    variant={variant}
                    showModal={showModal}
                  />
                )}
            </Nav.Item>
          );
        })}
        {renderModal(modalInfo, closeModal)}
      </Nav>
    </Col>
  );
};

export default Channels;
