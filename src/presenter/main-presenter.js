import Sort from '../view/sort-view';
import Filter from '../view/filter-view';
import CreationForm from '../view/creation-form-view';
import EditionForm from '../view/edition-form-view';
import TripPoint from '../view/trip-point-view';
import TripPointsList from '../view/trip-points-list-view';
import { render } from '../render';

export default class MainPresenter{
  PointRouteListPart = new TripPointsList();

  constructor(tripEvents, tripControlFilters, TripPointModel) {
    this.tripEvents = tripEvents;
    this.tripControlFilters = tripControlFilters;
    this.TripPointModel = TripPointModel;
  }

  init(){
    this.allPoints = [...this.TripPointModel.getTripPoint()];

    render(new Filter, this.tripControlFilters);
    render(new Sort, this.tripEvents);
    render(this.PointRouteListPart, this.tripEvents);
    render(new EditionForm({tripPoint: this.allPoints[0]}), this.PointRouteListPart.getElement());

    for(let i = 0; i < this.allPoints.length; i++){
      render(new TripPoint({tripPoint: this.allPoints[i]}), this.PointRouteListPart.getElement());
    }

    render(new CreationForm, this.PointRouteListPart.getElement());
  }
}
