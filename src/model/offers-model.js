import Observable from '../framework/observable';

export default class OffersModel extends Observable {
  #service = null;
  #offers = [];

  constructor({ service }) {
    super();
    this.#service = service;
    this.#offers = this.#service.getOffers();
  }

  getAll() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }
}
