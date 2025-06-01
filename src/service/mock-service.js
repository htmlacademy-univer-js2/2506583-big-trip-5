import { getRandomInteger, getRandomArrayElement } from '../mock/utils';
import { generateDestination, generateOffer, generatePoint } from '../mock';
import { POINT_TYPES } from '../const';

export default class MockService {
  #destinations = null;
  #offers = null;
  #points = null;

  constructor() {
    this.#destinations = this.#generateDestinations();
    this.#offers = this.#generateOffers();
    this.#points = this.#generatePoints();
  }

  #generateDestinations() {
    return Array.from({ length: 5 }, generateDestination);
  }

  #generateOffers() {
    return POINT_TYPES.map((type) => ({
      type,
      offers: Array.from({ length: 5 }, generateOffer)
    }));
  }

  #generatePoints() {
    return Array.from({ length: 5 }, () => {
      const type = getRandomArrayElement(POINT_TYPES);
      const destination = getRandomArrayElement(this.#destinations);
      const hasOffers = getRandomInteger(0, 1);
      const offersByType = this.#offers.find((offer) => offer.type === type);
      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInteger(0, 5))
          .map((offer) => offer.id)
        : [];

      return generatePoint(type, destination.id, offerIds);
    });
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#offers;
  }

  getPoints() {
    return this.#points;
  }

  updatePoint = (updatedPoint) => updatedPoint;
  addPoint = (data) => ({...data, id: crypto.randomUUID()});
  deletePoint() {}
}
