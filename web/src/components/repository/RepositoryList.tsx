import React from 'react';

import { RepositoryCard } from './RepositoryCard';

import { Repo } from '../../models/Repo';

interface ListProps {
  data: Repo[] | null;
}

export class RepositoryList extends React.Component<ListProps> {
  public render() {
    if (!this.props.data || this.props.data.length === 0) {
      return <p>No repositories</p>;
    }

    const listItems = this.props.data.map((repo, i) => {
      return <RepositoryCard data={repo} key={i} />;
    });

    return <div className="w-full flex flex-col gap-3">{listItems}</div>;
  }
}
