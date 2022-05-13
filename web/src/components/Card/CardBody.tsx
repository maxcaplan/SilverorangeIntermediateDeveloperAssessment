interface CardBodyProps {
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
}

export function CardBody(props: CardBodyProps) {
  return (
    <div
      className={`p-3 ${props.className}`}
      onClick={() => props.handleClick && props.handleClick()}
    >
      {props.children}
    </div>
  );
}
