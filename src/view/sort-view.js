import { createElement } from "../render";

const SORT_ELEMENTS = ['Day', 'Event', 'Time', 'Price', 'Offers']


const createSortItemTemplate = (type) =>
  `<div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" checked>
    <label class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>`;

const createSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_ELEMENTS.map((type) => createSortItemTemplate(type)).join('')}
  </form>`;

export default class Sort{
  getTemplate(){
    return createSortTemplate();
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
