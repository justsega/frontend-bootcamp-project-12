import React from 'react';
import {
  Col, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions as channelsActions } from '../../slices/channelsSlice';
import ChannelsHeader from './ChannelsHeader';
import { UnRemovableBtn, RemovableBtn } from './ChannelsButtons';
import ModalComponent from '../modals/ModalComponent';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const { activeChannelId } = useSelector((state) => state.channels);
  const setCurrChannel = (id) => dispatch(channelsActions.activeChannelId(id));

  return (
    <RenderChannels
      t={t}
      channels={channels}
      activeChannelId={activeChannelId}
      setCurrChannel={setCurrChannel}
    />
  );
};

const RenderChannels = ({
  channels, activeChannelId, setCurrChannel,
}) => (
  <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
    <ChannelsHeader />
    <Nav as="ul" fill className="flex-column nav-pills px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
      {channels.map((ch) => {
        const variant = (ch.id === activeChannelId) ? 'secondary' : null;
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
                />
              )}
          </Nav.Item>
        );
      })}
      <ModalComponent />
    </Nav>
  </Col>
);

export default Channels;
