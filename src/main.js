import MainPresenter from './presenter/main-presenter.js';
import TripPointModel from './model/trip-point-model.js';

const tripControlFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const tripPoint = new TripPointModel();

const mainPresenter = new MainPresenter(tripEvents, tripControlFilters, tripPoint);

mainPresenter.init();
