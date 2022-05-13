import './Button.css';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={() => props.handleClick && props.handleClick()}
      className={`btn ${props.className}`}
    >
      {props.children}
    </button>
  );
}
