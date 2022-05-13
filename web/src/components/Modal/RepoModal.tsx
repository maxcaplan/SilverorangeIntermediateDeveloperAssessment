import React from 'react';

import { Modal } from './Modal';
import { Card } from '../Card/Card';
import { CardHeader } from '../Card/CardHeader';
import { CardBody } from '../Card/CardBody';
import { Button } from '../Button/Button';
import { MarkdownIcon, RepoIcon, XIcon } from '@primer/octicons-react';
import { CommitCard } from '../Commit/CommitCard';

import { Repo } from '../../models/Repo';
import { AppError } from '../../models/AppError';
import { Commit } from '../../models/Commit';
import { ReadMeCard } from '../ReadMe/ReadMeCard';

interface RepoModalProps {
  repo: Repo;
  handleClose: () => void;
}

interface RepoModalState {
  isCommitsLoading: boolean;
  isCommitsFailed: boolean;
  commitsError: AppError | null;
  commits: Commit[] | null;

  isReadMeLoading: boolean;
  isReadMeFailed: boolean;
  readMeError: AppError | null;
  readMe: string | null;
}

export class RepoModal extends React.Component<RepoModalProps, RepoModalState> {
  constructor(props: RepoModalProps) {
    super(props);

    this.state = {
      isCommitsLoading: false,
      isCommitsFailed: false,
      commitsError: null,
      commits: null,

      isReadMeLoading: false,
      isReadMeFailed: false,
      readMeError: null,
      readMe: null,
    };
  }

  private async getCommits(url: RequestInfo) {
    try {
      await this.setState({
        isCommitsLoading: true,
        isCommitsFailed: false,
        commitsError: null,
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
        isCommitsLoading: false,
        isCommitsFailed: false,
        commitsError: null,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch commit data';

      this.setState({
        isCommitsFailed: true,
        isCommitsLoading: false,
        commitsError: new AppError(message, 500),
      });

      throw err;
    }
  }

  private async getReadMe(url: RequestInfo) {
    try {
      await this.setState({
        isCommitsLoading: true,
        isCommitsFailed: false,
        commitsError: null,
      });

      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        this.setState({
          isReadMeFailed: true,
          isReadMeLoading: false,
          readMeError: new AppError(response.statusText, response.status),
        });

        throw response.statusText;
      }

      const data = await response.text();

      this.setState({
        isReadMeLoading: false,
        isReadMeFailed: false,
        readMeError: null,
        readMe: data,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch ReadMe data';

      this.setState({
        isReadMeFailed: true,
        isReadMeLoading: false,
        readMeError: new AppError(message, 500),
      });

      throw err;
    }
  }

  public componentDidMount() {
    this.getCommits(this.props.repo.url + '/commits');
    this.getReadMe(
      `https://raw.githubusercontent.com/${this.props.repo.full_name}/master/README.md`
    );
  }

  public render() {
    const readMe =
      this.state.readMe && !this.state.isReadMeLoading ? (
        <ReadMeCard markdown={this.state.readMe} />
      ) : (
        <i className="text-sm text-gray-500 text-center mb-3">
          This repository has no README...
        </i>
      );

    return (
      <Modal>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <RepoIcon
              size={24}
              verticalAlign="middle"
              className="text-gray-500 mr-2"
            />

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
            {this.state.commits && !this.state.isCommitsLoading && (
              <CommitCard commit={this.state.commits[0]} />
            )}

            <span className="flex items-center">
              <MarkdownIcon
                size={16}
                verticalAlign="middle"
                className="text-gray-500 mr-2"
              />
              <b>README.md:</b>
            </span>

            {readMe}
          </CardBody>
        </Card>
      </Modal>
    );
  }
}
