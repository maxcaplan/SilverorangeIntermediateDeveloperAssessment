import React from 'react';

import { Modal } from './Modal';
import { Card } from '../Card/Card';
import { CardHeader } from '../Card/CardHeader';
import { CardBody } from '../Card/CardBody';
import { Button } from '../Button/Button';
import { XIcon } from '@primer/octicons-react';
import { CommitCard } from '../Commit/CommitCard';

import { Repo } from '../../models/Repo';
import { AppError } from '../../models/AppError';
import { Commit } from '../../models/Commit';

interface RepoModalProps {
  repo: Repo;
  handleClose: () => void;
}

interface RepoModalState {
  isLoading: boolean;
  isFailed: boolean;
  error: AppError | null;
  commits: Commit[] | null;
}

export class RepoModal extends React.Component<RepoModalProps, RepoModalState> {
  constructor(props: RepoModalProps) {
    super(props);

    this.state = {
      isLoading: false,
      isFailed: false,
      error: null,
      commits: null,
    };
  }

  private async getCommits(url: RequestInfo) {
    try {
      await this.setState({
        isLoading: true,
        isFailed: false,
        error: null,
      });

      const response = await fetch(url, {
        method: 'GET',

        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      });

      const data: Commit[] = await response.json();

      this.setState({
        commits: data,
        isLoading: false,
        isFailed: false,
        error: null,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch commit data';

      this.setState({
        isFailed: true,
        isLoading: false,
        error: new AppError(message, 500),
      });

      throw err;
    }
  }

  public componentDidMount() {
    this.getCommits(this.props.repo.url + '/commits');
  }

  public render() {
    return (
      <Modal>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <p className="block grow text-xl font-bold">
              {this.props.repo?.full_name}
            </p>
            <Button
              className="flex align-center btn-light-outlined rounded-full p-1 aspect-square"
              handleClick={() => this.props.handleClose()}
            >
              <XIcon verticalAlign="middle" />
            </Button>
          </CardHeader>

          <CardBody className="flex flex-col gap-2">
            {this.state.commits && (
              <CommitCard commit={this.state.commits[0]} />
            )}
          </CardBody>
        </Card>
      </Modal>
    );
  }
}
