import { createElement } from "../render";

const FILTER_ELEMENTS = ['Everything', 'Future', 'Present', 'Past', 'Accept filter']


const createFilterItemTemplate = (type) =>
  `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" checked>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`

const createFilterTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
    ${FILTER_ELEMENTS.map((type) => createFilterItemTemplate(type)).join('')}
  </form>`;

export default class Filter{
  getTemplate(){
    return createFilterTemplate();
  }

  getElement(){
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
