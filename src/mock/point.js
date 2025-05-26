import { Price } from './const';
import { getRandomDate, getRandomInteger } from './utils';

export const generatePoint = (type, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInteger(Price.MIN, Price.MAX),
  dateFrom: getRandomDate(),
  dateTo: getRandomDate({ next: true }),
  destination: destinationId,
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: offerIds,
  type,
});
