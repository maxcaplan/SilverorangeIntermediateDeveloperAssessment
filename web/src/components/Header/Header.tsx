import React from 'react';

import { Direction } from '../../models/Direction';
import { SortButton } from './SortButton';

interface HeaderProps {
  dir: Direction;
  updateListDirection: (dir: Direction) => void;
}

// interface HeaderState {
//   dir: Direction;
// }

// export class Header extends React.Component<HeaderProps, HeaderState> {
//   constructor(props: HeaderProps) {
//     super(props);

//     this.state = { dir: 'asc' };
//   }

//   private toggleDirection = () => {
//     const newDir = this.state.dir === 'asc' ? 'desc' : 'asc';

//     this.setState({ dir: newDir });
//   };

//   public render() {
//     return (
//       <div className="flex justify-end mb-3">
//         <SortButton
//           dir={this.state.dir}
//           toggleDirection={this.toggleDirection}
//         />
//       </div>
//     );
//   }
// }

export function Header(props: HeaderProps) {
  const toggleDirection = () => {
    const newDir = props.dir === 'asc' ? 'desc' : 'asc';

    props.updateListDirection(newDir);
  };

  return (
    <div className="flex justify-end mb-3">
      <SortButton dir={props.dir} toggleDirection={() => toggleDirection()} />
    </div>
  );
}
