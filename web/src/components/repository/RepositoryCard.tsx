import React from 'react';

import { Repo } from '../../models/Repo';
import { RepositoryHeader } from './RepositoryHeader';
import { RepositoryDesc } from './RepositoryDesc';
import { RepositoryFooter } from './RepositoryFooter';

interface CardProps {
  data: Repo;
}

export function RepositoryCard(props: CardProps) {
  return (
    <div className="block bg-gray-100 p-3 rounded-md shadow-sm border border-slate-300">
      <div className="grid grid-flow-row grid-rows-auto gap-1">
        <RepositoryHeader
          name={props.data.name}
          stars={props.data.stargazers_count}
        />

        <RepositoryDesc desc={props.data.description} />

        <RepositoryFooter
          lang={props.data.language}
          forks={props.data.forks_count}
        />
      </div>
    </div>
  );
}
