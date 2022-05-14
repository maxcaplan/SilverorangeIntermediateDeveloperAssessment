import React from 'react';

import { RepositoryList } from './RepositoryList';

import { RepositoryListProps } from '../../models/RepositoryList';
import { StatusCard } from '../Status/StatusCard';

interface StatusComponentProps extends RepositoryListProps {
  isLoading: boolean;
  isFailed: boolean;
}

export function WithRepositoryListStatus(Component: typeof RepositoryList) {
  return function WithStatusComponent({
    isLoading,
    isFailed,
    data,
    langs,
    handleClick,
  }: StatusComponentProps) {
    if (isFailed) {
      return <StatusCard type="error">Failed to get repositories</StatusCard>;
    }

    if (isLoading) {
      return <StatusCard type="info">Loading repositories...</StatusCard>;
    }

    return <Component data={data} langs={langs} handleClick={handleClick} />;
  };
}
