import './Button.css';

interface DropdownProps {
  onClick?: (e: MouseEvent) => any;
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
}

export function Button(props: DropdownProps) {
  return (
    <button
      onClick={() => props.handleClick && props.handleClick()}
      className={`btn ${props.className}`}
    >
      {props.children}
    </button>
  );
}
