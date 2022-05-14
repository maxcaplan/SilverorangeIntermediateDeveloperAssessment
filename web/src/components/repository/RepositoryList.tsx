import React from 'react';

import { RepositoryCard } from './RepositoryCard';

import { RepositoryListProps } from '../../models/RepositoryList';
import { StatusCard } from '../Status/StatusCard';

export function RepositoryList(props: RepositoryListProps) {
  if (!props.data) {
    return <StatusCard type="alert">There are no repositories...</StatusCard>;
  }

  const listItems = props.data.map((repo, i) => {
    let cardLang;

    if (props.langs) {
      cardLang = props.langs.find((lang) => {
        return lang.name === repo.language;
      });
    }

    return (
      <RepositoryCard
        data={repo}
        key={i}
        lang={cardLang || { name: repo.language }}
        handleClick={() => props.handleClick && props.handleClick(repo)}
      />
    );
  });

  return <div className="w-full flex flex-col gap-3">{listItems}</div>;
}
