import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';

export const UnRemovableBtn = ({
  name, setCurrChannel, id, variant,
}) => (
  <Button
    type="button"
    variant={variant}
    onClick={() => setCurrChannel(id)}
    className="text-truncate w-100 rounded-0 text-start"
  >
    <span className="me-1">#</span>
    {name}
  </Button>
);

export const RemovableBtn = ({
  variant, setCurrChannel, id, name, showModal,
}) => (
  <Dropdown as={ButtonGroup} className="d-flex">
    <Button
      type="button"
      variant={variant}
      onClick={() => setCurrChannel(id)}
      className="text-truncate w-100 rounded-0 text-start"
    >
      <span className="me-1">#</span>
      {name}
    </Button>
    <Dropdown.Toggle
      variant={variant}
      className="flex-grow-0 dropdown-toggle dropdown-toggle-split"
      id="dropdown-basic"
    >
      <span className="visually-hidden">Управление каналом</span>
    </Dropdown.Toggle>
    <Dropdown.Menu className="rounded-0">
      <Dropdown.Item className="remove-dropdown-item" onClick={() => showModal('remove', id)}>Удалить</Dropdown.Item>
      <Dropdown.Item className="rename-dropdown-item" onClick={() => showModal('rename', id)}>Переименовать</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
