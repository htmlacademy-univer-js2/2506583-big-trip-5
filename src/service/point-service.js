import { Method } from '../const';
import ApiService from '../framework/api-service';

export default class PointService extends ApiService {
  async fetchData ({ url }) {
    const response = await this._load({ url });
    return ApiService.parseResponse(response);
  }

  getDestinations() {
    return this.fetchData({ url: 'destinations' });
  }

  getOffers() {
    return this.fetchData({ url: 'offers' });
  }

  getPoints() {
    return this.fetchData({ url: 'points' });
  }

  async updatePoint (updatedPoint) {
    const response = await this._load({
      url: `points/${updatedPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(updatedPoint),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    return ApiService.parseResponse(response);
  }

  addPoint = (data) => ({...data, id: crypto.randomUUID()});
  deletePoint = () => {};
}
