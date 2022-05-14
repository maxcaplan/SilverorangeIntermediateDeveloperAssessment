import { Card } from '../Card/Card';
import { CardBody } from '../Card/CardBody';

interface StatusCardProps {
  type: 'alert' | 'error' | 'info';
  children?: React.ReactNode;
}

export function StatusCard({ children, type }: StatusCardProps) {
  const typeClassNames = {
    alert: 'bg-orange-100 text-orange-900 border-orange-300',
    error: 'bg-red-100 text-red-900 border-red-300',
    info: 'bg-blue-100 text-blue-900 border-blue-300',
  };

  return (
    <Card className={typeClassNames[type]}>
      <CardBody>{children}</CardBody>
    </Card>
  );
}
