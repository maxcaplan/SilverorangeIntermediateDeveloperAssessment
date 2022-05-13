interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
}

export function CardHeader(props: CardHeaderProps) {
  return (
    <div
      className={`border-b mx-3 py-3 border-slate-300 ${props.className}`}
      onClick={() => props.handleClick && props.handleClick()}
    >
      {props.children}
    </div>
  );
}
