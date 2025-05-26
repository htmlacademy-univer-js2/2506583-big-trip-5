import { Price, POINT_OFFERS } from './const';
import { getRandomArrayElement, getRandomInteger } from './utils';

export const generateOffer = () => ({
  id: crypto.randomUUID(),
  title: getRandomArrayElement(POINT_OFFERS),
  price: getRandomInteger(Price.MIN, Price.MAX),
});
