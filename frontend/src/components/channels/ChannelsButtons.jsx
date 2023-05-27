import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();
  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <UnRemovableBtn name={name} variant={variant} setCurrChannel={setCurrChannel} id={id}>
        {name}
      </UnRemovableBtn>
      <Dropdown.Toggle
        variant={variant}
        className="flex-grow-0 dropdown-toggle dropdown-toggle-split"
        id="dropdown-basic"
      >
        <span className="visually-hidden">{t('channelsPage.dropDown.controlLabel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="rounded-0">
        <Dropdown.Item className="remove-dropdown-item" onClick={() => showModal('remove', id)}>{t('channelsPage.dropDown.delete')}</Dropdown.Item>
        <Dropdown.Item className="rename-dropdown-item" onClick={() => showModal('rename', id)}>{t('channelsPage.dropDown.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
