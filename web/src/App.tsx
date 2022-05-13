import React from 'react';

import { RepositoryList } from './components/repository/RepositoryList';

import { Repo } from './models/Repo';
import { AppError } from './models/AppError';
import { Direction } from './models/Direction';

import './App.css';
import { Header } from './components/Header/Header';

type AppProps = any;

// origRepos: the original array of repo data from /repos
// repos: the current array of repo data
interface AppState {
  isLoading: boolean;
  isFailed: boolean;
  error: AppError | null;
  dir: Direction;
  origRepos: Repo[] | null;
  repos: Repo[] | null;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      isLoading: false,
      isFailed: false,
      error: null,
      dir: 'asc',
      origRepos: null,
      repos: null,
    };
  }

  // Sorts repository array by date created
  // in ascending (asc) or descending (desc) order
  private sortRepositories(repos: Repo[], order: Direction = 'asc'): Repo[] {
    return repos.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();

      if (aTime < bTime) {
        return order === 'asc' ? -1 : 1;
      }

      if (aTime > bTime) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  private async getRepositories(url: RequestInfo) {
    try {
      this.setState({
        isLoading: true,
      });

      const response = await fetch(url, {
        method: 'GET',

        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      });

      const data: Repo[] = await response.json();
      const sortedData = this.sortRepositories(data, this.state.dir);

      this.setState({
        isLoading: false,
        origRepos: data,
        repos: sortedData,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch repository data';

      this.setState({
        isFailed: true,
        isLoading: false,
        error: new AppError(message, 500),
      });

      throw err;
    }
  }

  private updateDirection = (dir: Direction) => {
    if (!this.state.repos) {
      return;
    }

    const sortedRepos = this.sortRepositories(this.state.repos, dir);

    this.setState({
      dir,
      repos: sortedRepos,
    });
  };

  public componentDidMount() {
    this.getRepositories('http://localhost:4000/repos');
  }

  public render() {
    return (
      <div className="App container mx-auto py-3 px-2">
        <Header
          dir={this.state.dir}
          updateListDirection={this.updateDirection}
        />

        {!this.state.isLoading && !this.state.isFailed && (
          <RepositoryList data={this.state.repos} />
        )}
      </div>
    );
  }
}
