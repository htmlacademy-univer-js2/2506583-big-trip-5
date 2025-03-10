import Sort from '../view/sort-view';
import Filter from '../view/filter-view';
import CreationForm from '../view/creation-form-view';
import EditionForm from '../view/edition-form-view';
import TripPoint from '../view/trip-point';
import TripPointsList from '../view/trip-points-list';
import { render } from '../render';

const MAX_TRIP_POINT_COUNT = 3;

export default class MainPresenter{
  PointRouteListPart = new TripPointsList();

  constructor() {
    this.tripEvents = document.querySelector('.trip-events');
    this.tripControlFilters = document.querySelector('.trip-controls__filters');
  }

  init(){
    render(new Filter, this.tripControlFilters);
    render(new Sort, this.tripEvents);
    render(this.PointRouteListPart, this.tripEvents);
    render(new EditionForm, this.PointRouteListPart.getElement());

    for(let i = 0; i < MAX_TRIP_POINT_COUNT; i++){
      render(new TripPoint, this.PointRouteListPart.getElement());
    }

    render(new CreationForm, this.PointRouteListPart.getElement());
  }
}
