import { capitalize } from '../utils/common';

export const createFilterTemplate = ({filters}) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map(({ type, isDisabled }, filterIndex) => `
      <div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${isDisabled ? 'disabled' : ''}
          ${filterIndex === 0 ? 'checked' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${type}">
          ${capitalize(type)}
        </label>
      </div>
    `).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;
