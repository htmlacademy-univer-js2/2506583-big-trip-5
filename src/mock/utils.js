import { Duration } from './const';
import dayjs from 'dayjs';

export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
export const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();
export const getRandomDate = ({next = false} = {}) => {
  const minsGap = getRandomInteger(0, Duration.MINUTE);
  const hoursGap = getRandomInteger(1, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }

  return date;
};
