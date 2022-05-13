import React from 'react';

import { RepositoryCard } from './RepositoryCard';

import { Repo } from '../../models/Repo';
import { Language } from '../../models/Language';

interface ListProps {
  data: Repo[] | null;
  langs: Language[] | null;
}

export class RepositoryList extends React.Component<ListProps> {
  public render() {
    if (!this.props.data || this.props.data.length === 0) {
      return <p>No repositories</p>;
    }

    const listItems = this.props.data.map((repo, i) => {
      let cardLang;

      if (this.props.langs) {
        cardLang = this.props.langs.find((lang) => {
          return lang.name === repo.language;
        });
      }

      return (
        <RepositoryCard
          data={repo}
          key={i}
          lang={cardLang || { name: repo.language }}
        />
      );
    });

    return <div className="w-full flex flex-col gap-3">{listItems}</div>;
  }
}
