import { Language } from './Language';
import { Repo } from './Repo';

export interface RepositoryListProps {
  data: Repo[] | null;
  langs: Language[] | null;
  handleClick?: (repo: Repo) => void;
}
