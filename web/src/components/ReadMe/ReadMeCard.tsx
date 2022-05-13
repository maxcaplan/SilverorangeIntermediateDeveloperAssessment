import ReactMarkdown from 'react-markdown';
import { readMeComponents } from './readMeComponents';

import { Card } from '../Card/Card';
import { CardBody } from '../Card/CardBody';

export function ReadMeCard({ markdown }: { markdown: string }) {
  return (
    <Card className="bg-gray-100">
      <CardBody>
        <ReactMarkdown
          children={markdown}
          components={readMeComponents}
          className="grid grid-flow-row gap-2"
        />
      </CardBody>
    </Card>
  );
}
