interface DescProps {
  desc: string;
}

export function RepositoryDesc(props: DescProps) {
  const hasDesc = props.desc !== null;

  return (
    <p className={`${hasDesc ? '' : 'italic text-gray-500'}`}>
      {hasDesc ? props.desc : 'No description...'}
    </p>
  );
}
