import { POINT_TYPES } from '../const';
import { POINT_DESTINATIONS } from '../mock/const';
import { formatStringToDateTime } from '../utils/point';
import { capitalize, getLastWord } from '../utils/common';

const createPointTypesTemplate = () => `
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${POINT_TYPES.map((type) => `
      <div class="event__type-item">
        <input
          id="event-type-${type}-1"
          class="event__type-input  visually-hidden"
          type="radio" name="event-type"
          value="${type}"
        >
        <label
          class="event__type-label  event__type-label--${type}"
          for="event-type-${type}-1"
        >
          ${capitalize(type)}
        </label>
      </div>
    `).join('')}
  </fieldset>
`;

const createPointCitiesTemplate = () => `
  <datalist id="destination-list-1">
    ${POINT_DESTINATIONS.map((city) => `<option value="${city}"></option>`).join('')}
  </datalist>
`;

const createOffersTemplate = ({ offers, selectedOffers }) => `
  <div class="event__available-offers">
    ${offers.map((offer) => {
    const offerType = getLastWord(offer.title);
    const checked = selectedOffers.some((offerId) => offerId === offer.id) ? 'checked' : '';
    return `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${offerType}-${offer.id}"
        type="checkbox"
        name="event-offer-${offerType}"
        data-offer-id="${offer.id}"
        ${checked}
      >
      <label
        class="event__offer-label"
        for="event-offer-${offerType}-${offer.id}"
      >
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('')}
  </div>
`;

const createDestinationPhotosTemplate = ({ destination }) => `
  <div class="event__photos-tape">
    ${destination.pictures.map((picture) => `
      <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `).join('')}
  </div>
`;

const createOffersSectionTemplate = ({ offers, selectedOffers }) => `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createOffersTemplate({ offers, selectedOffers })}
    </div>
  </section>
`;

const createDestinationSectionTemplate = ({ destination }) => {
  if (!destination.pictures.length && !destination.description.length) {
    return '';
  }

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${destination.description.length
    ? `<p class="event__destination-description">
        ${destination.description}
      </p>` : ''}

      ${destination.pictures.length
    ? `<div class="event__photos-container">
        ${createDestinationPhotosTemplate({ destination })}
      </div>` : ''}

    </section>`;
};

export const createEditPointTemplate = ({ point, destinations, offers }) => {
  const { basePrice, dateFrom, dateTo, offers: selectedOffers, type } = point;

  const currentDestination = destinations.find((destination) => destination.id === point.destination);
  const currentOffers = offers.find((offer) => offer.type === type).offers;
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              ${createPointTypesTemplate()}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${capitalize(type)}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${currentDestination?.name}"
              list="destination-list-1"
            >
            ${createPointCitiesTemplate()}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${formatStringToDateTime(dateFrom)}"
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${formatStringToDateTime(dateTo)}
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${currentOffers.length ? createOffersSectionTemplate({ offers: currentOffers, selectedOffers }) : ''}
          ${currentDestination ? createDestinationSectionTemplate({ destination: currentDestination }) : ''}
        </section>
      </form>
    </li>
  `;
};

