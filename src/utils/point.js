import { TimePeriods } from '../const';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const formatStringToDateTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');
export const formatStringToShortDate = (date) => dayjs(date).format('MMM DD');
export const formatStringToTime = (date) => dayjs(date).format('HH:mm');

export const getPointDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  if (timeDiff >= TimePeriods.MSEC_IN_DAY) {
    return dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
  } else if (timeDiff >= TimePeriods.MSEC_IN_HOUR) {
    return dayjs.duration(timeDiff).format('HH[H] mm[M]');
  }
  return dayjs.duration(timeDiff).format('mm[M]');
};

export const getPointsDateDifference = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
export const getPointsPriceDifference = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
export const getPointsDurationDifference = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return durationB - durationA;
};

export const isPointFuture = (point) => dayjs().isBefore(point.dateFrom);
export const isPointPast = (point) => dayjs().isAfter(point.dateTo);
export const isPointPresent = (point) => dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);
