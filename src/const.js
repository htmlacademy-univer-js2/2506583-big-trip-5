export const TimePeriods = {
  MSEC_IN_SEC: 1000,
  MSEC_IN_HOUR: 60 * 60 * 1000,
  MSEC_IN_DAY: 24 * 60 * 60 * 1000
};

export const PointFilters = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const EmptyListMessage = {
  [PointFilters.EVERYTHING]: 'Click New Event to create your first point',
  [PointFilters.FUTURE]: 'There are no future events now',
  [PointFilters.PRESENT]: 'There are no present events now',
  [PointFilters.PAST]: 'There are no past events now'
};

export const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export const EnabledSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFERS]: false
};

export const POINT_DESTINATIONS = [
  'Moscow',
  'London',
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'Saint Petersburg',
  'Paris',
  'Ekaterinburg',
];

export const POINT_TYPES = [
  'taxi',
  'flight',
  'bus',
  'train',
  'ship',
  'drive',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const ButtonLabel = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  SAVE: 'Save'
};

const DEFAULT_TYPE = 'flight';

export const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

export const EditType = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};
