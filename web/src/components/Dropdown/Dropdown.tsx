import { ChevronDownIcon } from '@primer/octicons-react';
import { Button } from '../Button/Button';

import './Dropdown.css';

interface DropdownProps {
  open: boolean;
  handleClick?: () => void;
  buttonClassName?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
}

export function Dropdown(props: DropdownProps) {
  return (
    <div
      className={`relative inline-block text-left ${props.wrapperClassName}`}
    >
      <div>
        <Button
          handleClick={() => props.handleClick && props.handleClick()}
          className={`btn-light-outlined ${props.buttonClassName}`}
        >
          Langs
          <ChevronDownIcon
            size="small"
            verticalAlign="middle"
            className="ml-1"
          />
        </Button>
      </div>

      {props.open && props.children && (
        <div className="menu" role="menu" tabIndex={-1}>
          <div className="py-1" role="none">
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
}
