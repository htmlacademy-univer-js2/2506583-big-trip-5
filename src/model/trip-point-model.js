import { createMockTripPoints } from '../mock/trip-point-mock';

const COUNT_TRIP_POINTS = 5;

export default class TripPointModel{
  tripPoints = Array.from({length: COUNT_TRIP_POINTS}, createMockTripPoints);

  getTripPoint() {
    return this.tripPoints;
  }
}
