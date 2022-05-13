import { DotFillIcon } from '@primer/octicons-react';
import React from 'react';

import { Direction } from '../../models/Direction';
import { Language } from '../../models/Language';
import { Dropdown } from '../Dropdown/Dropdown';
import { DropdownItem } from '../Dropdown/DropdownItem';
import { SortButton } from './SortButton';

interface HeaderProps {
  dir: Direction;
  updateListDirection: (dir: Direction) => void;
  langs: Language[] | null;
  activeLang?: Language;
}

interface HeaderState {
  dropdownOpen: boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };
  }

  private toggleDirection = () => {
    const newDir = this.props.dir === 'asc' ? 'desc' : 'asc';

    this.props.updateListDirection(newDir);
  };

  private toggleDropdown = () => {
    const newState = !this.state.dropdownOpen;

    this.setState({
      dropdownOpen: newState,
    });
  };

  public render() {
    // Create list of dropdown menu items
    let dropDownItems;
    if (this.props.langs) {
      dropDownItems = this.props.langs.map((lang, i) => {
        return (
          <DropdownItem key={i}>
            <DotFillIcon
              size="small"
              verticalAlign="middle"
              className="mr-1"
              fill={lang.colour}
            />
            {lang.name}
          </DropdownItem>
        );
      });
    }

    return (
      <div className="flex justify-end gap-2 mb-3">
        <Dropdown
          open={this.state.dropdownOpen}
          handleClick={() => this.toggleDropdown()}
        >
          {dropDownItems}
        </Dropdown>

        <SortButton
          dir={this.props.dir}
          toggleDirection={() => this.toggleDirection()}
        />
      </div>
    );
  }
}
