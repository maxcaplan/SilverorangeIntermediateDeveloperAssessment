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
  activeLang?: Language | null;
  updateActiveLang: (i: number) => void;
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

  private handleMenuItemClick(i: number) {
    this.props.updateActiveLang(i);
  }

  public render() {
    // Create Dropdown title from activeLang
    let dropdownTitle: string | JSX.Element = 'Langs';
    if (this.props.activeLang) {
      dropdownTitle = (
        <span>
          <DotFillIcon
            size="small"
            verticalAlign="middle"
            className="mr-1"
            fill={this.props.activeLang.colour}
          />
          {this.props.activeLang.name}
        </span>
      );
    }

    // Create list of dropdown menu items
    let dropDownItems;
    if (this.props.langs) {
      dropDownItems = this.props.langs.map((lang, i) => {
        return (
          <DropdownItem handleClick={() => this.handleMenuItemClick(i)} key={i}>
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
          title={dropdownTitle}
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
