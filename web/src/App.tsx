import React from 'react';

import { RepositoryList } from './components/repository/RepositoryList';

import { Repo } from './models/Repo';
import { AppError } from './models/AppError';

import './App.css';

type AppProps = any;

interface AppState {
  isLoading: boolean;
  isFailed: boolean;
  error: AppError | null;
  repos: Repo[] | null;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      isFailed: false,
      error: null,
      repos: null,
    };
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

      this.setState({
        isLoading: false,
        repos: data,
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

  public componentDidMount() {
    this.getRepositories('http://localhost:4000/repos');
  }

  public render() {
    return (
      <div className="App container mx-auto py-3">
        {!this.state.isLoading && !this.state.isFailed && (
          <RepositoryList data={this.state.repos} />
        )}
      </div>
    );
  }
}
