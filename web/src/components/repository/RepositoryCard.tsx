import { Button } from '../Button/Button';
import { RepositoryHeader } from './RepositoryHeader';
import { RepositoryDesc } from './RepositoryDesc';
import { RepositoryFooter } from './RepositoryFooter';

import { Repo } from '../../models/Repo';
import { Language } from '../../models/Language';

import './Repository.css';

interface CardProps {
  data: Repo;
  lang: Language;
  handleClick?: () => void;
}

export function RepositoryCard(props: CardProps) {
  return (
    <Button
      className="repositorycard"
      handleClick={() => props.handleClick && props.handleClick()}
    >
      <div className="grid grid-flow-row grid-rows-auto gap-1">
        <RepositoryHeader
          name={props.data.name}
          stars={props.data.stargazers_count}
        />

        <RepositoryDesc desc={props.data.description} />

        <RepositoryFooter lang={props.lang} forks={props.data.forks_count} />
      </div>
    </Button>
  );
}
