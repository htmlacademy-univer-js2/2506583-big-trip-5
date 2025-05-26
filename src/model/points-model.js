import { UpdateType } from '../const';
import Observable from '../framework/observable';
import { adaptToClient, adaptToServer } from '../utils/adapter';
import { updateItem } from '../utils/common';

export default class PointsModel extends Observable {
  #service = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

  constructor({ service, destinationsModel, offersModel }) {
    super();
    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  getAll() {
    return this.#points;
  }

  getById(id) {
    return this.#points.find((point) => point.id === id);
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init(),
      ]);

      const points = await this.#service.getPoints();
      this.#points = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {});
    } catch (error) {
      this.#points = [];
      this._notify(UpdateType.INIT, { error });
    }
  }

  add(type, point) {
    const newPoint = this.#service.addPoint(point);
    this.#points.push(newPoint);
    this._notify(type, newPoint);
  }

  async update(type, point) {
    try {
      const adaptedToServerPoint = adaptToServer(point);
      const updatedPoint = await this.#service.updatePoint(adaptedToServerPoint);
      const adaptedToClientPoint = adaptToClient(updatedPoint);

      this.#points = updateItem(this.#points, adaptedToClientPoint);
      this._notify(type, adaptedToClientPoint);
    } catch {
      throw new Error('Can\'t update point');
    }
  }

  delete(type, deletedPoint) {
    this.#service.deletePoint(deletedPoint);
    this.#points = this.#points.filter((point) => point.id !== deletedPoint.id);
    this._notify(type);
  }
}
