import { render } from '../framework/render';
import { generateFilters } from '../mock/filter';
import { FilterView } from '../view';

export default class FilterPresenter {
  #filterComponent = null;
  #filterContainer = null;
  #pointsModel = null;
  #filters = [];

  constructor({ filterContainer, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#filters = generateFilters(this.#pointsModel.getAll());
    this.#filterComponent = new FilterView({ filters: this.#filters });
  }

  init() {
    render(this.#filterComponent, this.#filterContainer);
  }
}
