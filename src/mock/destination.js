import { DESCRIPTIONS, POINT_DESTINATIONS } from './const';
import { getRandomArrayElement, getRandomInteger } from './utils';

export const generateDestination = () => ({
  id: crypto.randomUUID(),
  description: getRandomArrayElement(DESCRIPTIONS),
  name: getRandomArrayElement(POINT_DESTINATIONS),
  pictures: Array.from({length: getRandomInteger(1, 5)}, () => ({
    src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
    description: getRandomArrayElement(DESCRIPTIONS),
  })),
});
