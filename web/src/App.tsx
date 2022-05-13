import React from 'react';

import { Header } from './components/Header/Header';
import { RepositoryList } from './components/repository/RepositoryList';
import { RepoModal } from './components/Modal/RepoModal';

import { Repo } from './models/Repo';
import { AppError } from './models/AppError';
import { Direction } from './models/Direction';
import { Language } from './models/Language';

import { hslToRgb } from './utils/HslToRgb';

import './App.css';

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
  modalOpen: boolean;
  modalRepo: Repo | null;
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
      modalOpen: false,
      modalRepo: null,
    };
  }

  // Sorts repository array by date created
  // in ascending (asc) or descending (desc) order.
  // Returns new sorted array of repositories
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

  // Filters repository array by a language
  // Returns new filtered array of repositories
  private filterRepositories(repos: Repo[], lang: Language): Repo[] {
    return repos.filter((repo) => {
      return repo.language === lang.name;
    });
  }

  private async getRepositories(url: RequestInfo) {
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

      const data: Repo[] = await response.json();
      const sortedData = this.sortRepositories(data, this.state.dir);
      const languages = this.generateLanguageList(sortedData);

      this.setState({
        origRepos: data,
        repos: sortedData,
        langs: languages,
        isLoading: false,
        isFailed: false,
        error: null,
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

  // Gets a language selection from language state array.
  // If the selected language is already the active languge, returns null.
  // Else, returns selected language
  private getNewActiveLang(i: number): null | Language {
    if (!this.state.langs) {
      return null;
    }

    const newLang = this.state.langs[i];

    if (this.state.activeLang && newLang.name === this.state.activeLang.name) {
      return null;
    }

    return newLang;
  }

  // Sets activeLang state to a language in the language state array or to null.
  // Filters repository list by activeLang state.
  // Unfilters repository list if no activeLang.
  private setActiveLang = async (i: number) => {
    if (!this.state.langs || !this.state.origRepos) {
      return;
    }

    const newLang = this.getNewActiveLang(i);

    if (newLang !== null) {
      const filteredRepos = this.filterRepositories(
        this.state.origRepos,
        newLang
      );

      await this.setState({
        activeLang: newLang,
        repos: filteredRepos,
      });

      // re-sort array of repositories after filtering
      this.setDirection(this.state.dir);
    } else {
      const unfilteredRepos = this.state.origRepos;

      await this.setState({
        activeLang: null,
        repos: unfilteredRepos,
      });

      // re-sort array of repositories after removing filter
      this.setDirection(this.state.dir);
    }
  };

  // Sets sorting direction of repository list
  // and sorts repository list
  private setDirection = (dir: Direction) => {
    if (!this.state.repos) {
      return;
    }

    const sortedRepos = this.sortRepositories(this.state.repos, dir);

    this.setState({
      dir,
      repos: sortedRepos,
    });
  };

  // Set the open state of the repository modal to true
  private openModal() {
    if (!this.state.modalRepo) {
      return;
    }

    this.setState({
      modalOpen: true,
    });
  }

  // Set the open state of the repository modal to false
  private closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  // Opens a modal with the information of a specific repository
  private openRepoModal = async (repo: Repo) => {
    await this.setState({
      modalRepo: repo,
    });

    this.openModal();
  };

  public componentDidMount() {
    this.getRepositories('http://localhost:4000/repos');
  }

  public render() {
    return (
      <div>
        {this.state.modalOpen && this.state.modalRepo && (
          <RepoModal
            repo={this.state.modalRepo}
            handleClose={this.closeModal}
          />
        )}

        <div className="App container mx-auto py-3 px-2">
          <Header
            dir={this.state.dir}
            updateListDirection={this.setDirection}
            langs={this.state.langs}
            activeLang={this.state.activeLang}
            updateActiveLang={this.setActiveLang}
          />

          {!this.state.isLoading && !this.state.isFailed && (
            <RepositoryList
              data={this.state.repos}
              langs={this.state.langs}
              handleClick={this.openRepoModal}
            />
          )}
        </div>
      </div>
    );
  }
}
