import { DotFillIcon, RepoForkedIcon } from '@primer/octicons-react';

interface FooterProps {
  lang: string;
  forks: number;
}

export function RepositoryFooter(props: FooterProps) {
  return (
    <div className="flex flex-row mt-2 pt-2 gap-3 border-t border-slate-300">
      <div>
        <DotFillIcon size="small" verticalAlign="middle" className="mr-1" />
        <p className="inline">{props.lang}</p>
      </div>

      <div>
        <RepoForkedIcon size="small" verticalAlign="middle" className="mr-1" />
        <p className="inline">Forks: {props.forks}</p>
      </div>
    </div>
  );
}
