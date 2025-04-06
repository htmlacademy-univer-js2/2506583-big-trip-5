import { DESCRIPTIONS, CITIES, TRANSPORT} from '../const';
import { getRandomArrayElement, getRandomInRange } from '../utils';

const MIN_PHOTO_COUNT = 1;
const MAX_PHOTO_COUNT = 5;
function createMockDestinations() {
  return {
    description: getRandomArrayElement(DESCRIPTIONS),
    city: getRandomArrayElement(CITIES),
    picture: Array.from({length: getRandomInRange(MIN_PHOTO_COUNT, MAX_PHOTO_COUNT)}, () => `img/icons/${getRandomArrayElement(TRANSPORT)}.png`)
  };
}

export { createMockDestinations };
