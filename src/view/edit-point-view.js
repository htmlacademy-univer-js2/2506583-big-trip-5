import { POINT_EMPTY } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createEditPointTemplate } from '../template/edit-point-template.js';

export default class EditPointView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #onEditReset = null;
  #onEditSubmit = null;

  constructor({
    point = POINT_EMPTY,
    destinations,
    offers,
    onEditReset,
    onEditSubmit,
  }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onEditReset = onEditReset;
    this.#onEditSubmit = onEditSubmit;
    this._setState(EditPointView.parsePointToState({point}));
    this._restoreHandlers();
  }

  reset = (point) => this.updateElement({ point });

  _restoreHandlers = () => {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#submitClickHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#resetClickHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditReset();
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: [],
      },
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value,
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value).id;
    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestination,
      }
    });
  };

  #offerChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'))
      .map(({id}) => id.split('-').slice(3).join('-'));

    this._setState({
      point: {
        ...this._state.point,
        offers: selectedOffers
      }
    });
  };

  get template() {
    return createEditPointTemplate({
      point: this._state.point,
      destinations: this.#destinations,
      offers: this.#offers,
    });
  }

  static parsePointToState = ({ point }) => ({ point });
  static parseStateToPoint = (state) => state.point;
}
