import { getRandomArrayElement, getRandomInRange, generateTwoRandomDates } from '../utils';
import { TRANSPORT } from '../const';
import { createMockOffers } from './offer-mock';
import { createMockDestinations } from './destination-mock';

const MIN_TRIP_PRICE = 100;
const MAX_TRIP_PRICE = 500;
const MIN_COUNT_OFFERS = 1;
const MAX_COUNT_OFFERS = 5;

function createMockTripPoints() {
  const dates = generateTwoRandomDates();

  return {
    transport: getRandomArrayElement(TRANSPORT),
    destination: createMockDestinations(),
    startDateTime: dates[0],
    endDateTime: dates[1],
    price: getRandomInRange(MIN_TRIP_PRICE, MAX_TRIP_PRICE),
    offers: Array.from({length: getRandomInRange(MIN_COUNT_OFFERS, MAX_COUNT_OFFERS)}, createMockOffers),
    isfavorite: Boolean(getRandomInRange(0, 1))
  };
}

export { createMockTripPoints };
