import { OFFERS, TRANSPORT } from '../const';
import { getRandomArrayElement, getRandomInRange } from '../utils';

const MIN_PRICE = 100;
const MAX_PRICE = 500;

function createMockOffers() {
  return {
    transport: getRandomArrayElement(TRANSPORT),
    title: getRandomArrayElement(OFFERS),
    price: getRandomInRange(MIN_PRICE, MAX_PRICE)
  };
}

export { createMockOffers };
