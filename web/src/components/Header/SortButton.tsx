import { Button } from '../Button/Button';
import { SortAscIcon } from '@primer/octicons-react';
import { SortDescIcon } from '@primer/octicons-react';

import { Direction } from '../../models/Direction';

interface SortButtonProps {
  dir: Direction;
  toggleDirection: () => void;
}

export function SortButton(props: SortButtonProps) {
  const sortIcon =
    props.dir === 'asc' ? (
      <SortAscIcon size="small" verticalAlign="middle" className="mr-1" />
    ) : (
      <SortDescIcon size="small" verticalAlign="middle" className="mr-1" />
    );

  return (
    <Button
      className="btn-light-outlined"
      handleClick={() => props.toggleDirection()}
    >
      {sortIcon}
      Sort
    </Button>
  );
}
