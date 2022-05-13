import { Commit } from '../../models/Commit';
import { Card } from '../Card/Card';
import { CardBody } from '../Card/CardBody';

interface CommitCardProps {
  commit: Commit;
}

export function CommitCard(props: CommitCardProps) {
  function formatDate(dateString: string): string {
    const commitDate = new Date(dateString);
    const currentDate = new Date();

    // Difference between commit date and current date in milliseconds
    const timeDelta = currentDate.getTime() - commitDate.getTime();

    const minuteDiff = timeDelta / 60000;
    const hourDiff = minuteDiff / 60;
    const dayDiff = hourDiff / 24;

    // If under 1 hour ago, return time in minutes
    if (minuteDiff < 60) {
      return `${Math.round(minuteDiff)} ${
        minuteDiff < 1 ? 'minute' : 'minutes'
      } ago`;
    }

    // If under 1 day ago, return time in hours
    if (hourDiff < 24) {
      return `${Math.round(hourDiff)} ${hourDiff === 1 ? 'hour' : 'hours'} ago`;
    }

    // If under 1 month ago (roughly), return time in days
    if (dayDiff < 31) {
      return `${Math.round(dayDiff)} ${dayDiff === 1 ? 'day' : 'days'} ago`;
    }

    const day = commitDate.getDate();
    const month = commitDate.getMonth() + 1;
    const year = commitDate.getFullYear();

    // If over 1 month ago (roughly), return date of commit
    return `${day}/${month}/${year}`;
  }

  return (
    <Card className="shadow-sm">
      <CardBody className="flex flex-row items-center gap-2">
        <img
          src={props.commit.author.avatar_url}
          alt="avatar"
          className="h-6 rounded-full shadow-sm"
        />

        <b className="text-sm">{props.commit.author.login}</b>

        <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap grow">
          {props.commit.commit.message}
        </p>

        <p className="text-sm text-gray-500 whitespace-nowrap">
          {formatDate(props.commit.commit.author.date)}
        </p>
      </CardBody>
    </Card>
  );
}
