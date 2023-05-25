import React, { useState } from 'react';
import {
  Col, Button, Image, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { selectors, actions as channelsActions } from '../slices/channelsSlice';
import getModal from './modals/index';

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
  const handleChangeActiveChannel = (id) => dispatch(channelsActions.activeChannelId(id));

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channelsPage.channelsTitle')}</b>
        <Button variant="" onClick={() => showModal('add')} className="text-primary p-0 btn btn-group-vertical">
          <Image src="plus-square.svg" alt="add channel" className="btn-primary" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" fill className="flex-column nav-pills px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
        {channels.map((ch) => {
          const classesOfMainButtons = cn(
            'text-truncate',
            'w-100 ',
            'rounded-0',
            'text-start',
            {
              'btn-secondary': ch.id === activeChannelId,
            },
          );
          const classesOfControlButtons = cn(
            'flex-grow-0',
            'dropdown-toggle',
            'dropdown-toggle-split',
            {
              'btn-secondary': ch.id === activeChannelId,
            },
          );
          const unremovableBtn = (
            <Button
              variant=""
              onClick={() => handleChangeActiveChannel(ch.id)}
              className={classesOfMainButtons}
            >
              <span className="me-1">#</span>
              {ch.name}
            </Button>
          );
          const removableBtn = (
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button
                type="button"
                variant=""
                onClick={() => handleChangeActiveChannel(ch.id)}
                className={classesOfMainButtons}
              >
                <span className="me-1">#</span>
                {ch.name}
              </Button>
              <Dropdown.Toggle variant="" className={classesOfControlButtons} id="dropdown-basic">
                <span className="visually-hidden">Управление каналом</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="rounded-0">
                <Dropdown.Item onClick={() => showModal('remove', ch.id)}>Удалить</Dropdown.Item>
                <Dropdown.Item onClick={() => showModal('rename', ch.id)}>Переименовать</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
          // eslint-disable-next-line no-lone-blocks
          { return <Nav.Item as="li" key={ch.id} className="w-100">{(!ch.removable) ? unremovableBtn : removableBtn}</Nav.Item>; }
        })}
        {renderModal(modalInfo, closeModal)}
      </Nav>
    </Col>
  );
}

export default Channels;
