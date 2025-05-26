import { PointListView, EmptyListView } from '../view';
import { render, remove } from '../framework/render.js';
import { NewPointPresenter, PointPresenter, SortPresenter } from '../presenter';
import { sort } from '../utils/sort.js';
import { filterMethod } from '../utils/filter.js';
import { PointFilters, SortType, UpdateType, UserAction } from '../const.js';

export default class TripPresenter {
  #container = null;
  #emptyListComponent = null;
  #pointListComponent = new PointListView();

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #newPointButtonPresenter = null;
  #isCreating = false;
  #sortPresenter = null;
  #currentSortType = SortType.DAY;

  constructor({
    container,
    destinationsModel,
    offersModel,
    pointsModel,
    filterModel,
    newPointButtonPresenter,
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointButtonPresenter = newPointButtonPresenter;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onDestroy: this.#handleNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  init() {
    this.#renderTrip();
  }

  get points() {
    const currentFilter = this.#filterModel.get();
    const points = this.#pointsModel.getAll();

    const filteredPoints = filterMethod[currentFilter](points);
    return sort(filteredPoints, this.#currentSortType);
  }

  handleNewPointClick = () => {
    this.#isCreating = true;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.set(UpdateType.MAJOR, PointFilters.EVERYTHING);
    this.#newPointButtonPresenter.disableButton();
    this.#newPointPresenter.init();
  };

  #handleNewPointDestroy = ({isCanceled}) => {
    this.#isCreating = false;
    this.#newPointButtonPresenter.enableButton();
    if (!this.points.length && isCanceled) {
      this.#clearTrip();
      this.#renderTrip();
    }
  };

  #renderTrip = () => {
    if (!this.points.length && !this.#isCreating) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();
  };

  #clearTrip = ({ resetSortType = false } = {}) => {
    this.#clearPoints();
    remove(this.#emptyListComponent);
    if (this.#sortPresenter) {
      this.#sortPresenter.destroy();
      this.#sortPresenter = null;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderSort = () => {
    this.#sortPresenter = new SortPresenter({
      container: this.#container,
      currentSortType: this.#currentSortType,
      onSortChange: this.#handleSortChange,
    });

    this.#sortPresenter.init();
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#container);
  };

  #renderEmptyList = () => {
    this.#emptyListComponent = new EmptyListView({
      filterType: this.#filterModel.get(),
    });
    render(this.#emptyListComponent, this.#container);
  };

  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point));
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #handlePointChange = (action, updateType, point) => {
    switch (action) {
      case UserAction.ADD_POINT:
        this.#pointsModel.add(updateType, point);
        break;
      case UserAction.UPDATE_POINT:
        this.#pointsModel.update(updateType, point);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.delete(updateType, point);
        break;
    }
  };

  #handleModelChange = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };
}
