import { Button } from '../Button/Button';

import './Dropdown.css';

interface DropdownItemProps {
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
}

export function DropdownItem(props: DropdownItemProps) {
  return (
    <Button
      handleClick={() => props.handleClick && props.handleClick()}
      className="item-btn"
    >
      {props.children}
    </Button>
  );
}
