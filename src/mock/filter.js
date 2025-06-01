import { filterMethod } from '../utils/filter';

export const generateFilters = (points) =>
  Object.entries(filterMethod).map(([filterType, filterPoints]) => ({
    type: filterType,
    isDisabled: !filterPoints(points).length,
  }));
