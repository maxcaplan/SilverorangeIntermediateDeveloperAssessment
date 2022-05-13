import { RepoIcon, StarIcon, StarFillIcon } from '@primer/octicons-react';

interface HeaderProps {
  name: string;
  stars: number;
}

export function RepositoryHeader(props: HeaderProps) {
  const starCountIcon =
    props.stars === 0 ? (
      <StarIcon size="small" className="mr-1" />
    ) : (
      <StarFillIcon size="small" className="mr-1" />
    );

  return (
    <div className="flex">
      <div className="grow">
        <RepoIcon className="mr-1 text-gray-500" size="small" />
        <b>{props.name}</b>
      </div>

      <div className="bg-gray-200 px-1 rounded-md flex items-center border border-slate-300">
        {starCountIcon}
        <p className="inline text-sm">
          Stars: <b>{props.stars}</b>
        </p>
      </div>
    </div>
  );
}
