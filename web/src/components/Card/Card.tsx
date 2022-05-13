interface CardProps {
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
}

export function Card(props: CardProps) {
  return (
    <div
      className={`bg-white rounded-md border border-slate-300 ${props.className}`}
      onClick={() => props.handleClick && props.handleClick()}
    >
      {props.children}
    </div>
  );
}
