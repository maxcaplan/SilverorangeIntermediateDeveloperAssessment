import React from 'react';

import { RepositoryList } from './components/repository/RepositoryList';

import { Repo } from './models/Repo';
import { AppError } from './models/AppError';
import { Direction } from './models/Direction';

import './App.css';
import { Header } from './components/Header/Header';
import { Language } from './models/Language';

import { hslToRgb } from './utils/HslToRgb';

type AppProps = any;

// origRepos: the original array of repo data from /repos
// repos: the current array of repo data
interface AppState {
  isLoading: boolean;
  isFailed: boolean;
  error: AppError | null;
  origRepos: Repo[] | null;
  repos: Repo[] | null;
  dir: Direction;
  langs: Language[] | null;
  activeLang: Language | null;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      isLoading: false,
      isFailed: false,
      error: null,
      origRepos: null,
      repos: null,
      dir: 'asc',
      langs: null,
      activeLang: null,
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
      const languages = this.generateLanguageList(sortedData);

      this.setState({
        isLoading: false,
        origRepos: data,
        repos: sortedData,
        langs: languages,
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

  // Returns list of all languages present in array of repositories
  private generateLanguageList(repos: Repo[]): Language[] {
    const langs = repos.map((repo) => {
      return repo.language;
    });

    const uniqueLangs = langs
      .filter((lang, pos, self) => {
        return self.indexOf(lang) === pos;
      })
      .sort();

    // Unnecessarily creates mapping of colours to languages based on alphabetical order
    const langsAndColours: Language[] = uniqueLangs.map((lang, i) => {
      const colour = hslToRgb((i + 1) / uniqueLangs.length, 0.5, 0.5);

      return {
        name: lang,
        colour,
      };
    });

    return langsAndColours;
  }

  // Updates sorting direction of repository list
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

  // Sets activeLang state to a selection from the langs state array by an index
  private updateActiveLang = (i: number) => {
    if (!this.state.langs) {
      return;
    }

    const newLang = this.state.langs[i];

    // If there is no activeLang, set activeLang to newLang
    if (!this.state.activeLang) {
      this.setState({ activeLang: newLang });
      return;
    }

    // If newLang is equal to the current activeLang, set activeLang to null
    if (newLang.name === this.state.activeLang.name) {
      this.setState({ activeLang: null });
    } else {
      this.setState({ activeLang: newLang });
    }
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
          langs={this.state.langs}
          activeLang={this.state.activeLang}
          updateActiveLang={this.updateActiveLang}
        />

        {!this.state.isLoading && !this.state.isFailed && (
          <RepositoryList data={this.state.repos} langs={this.state.langs} />
        )}
      </div>
    );
  }
}
