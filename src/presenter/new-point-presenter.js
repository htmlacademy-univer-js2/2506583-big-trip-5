import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, EditType } from '../const.js';
import { EditPointView } from '../view';
import { isEscapeKey } from '../utils/common';

export default class NewPointPresenter {
  #container = null;
  #newPointComponent = null;

  #destinationsModel = null;
  #offersModel = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({
    container,
    destinationsModel,
    offersModel,
    onDataChange,
    onDestroy,
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (!this.#newPointComponent) {
      this.#newPointComponent = new EditPointView({
        destinations: this.#destinationsModel.getAll(),
        offers: this.#offersModel.getAll(),
        onSubmit: this.#handleFormSubmit,
        onClose: this.#handleFormClose,
        pointType: EditType.CREATING
      });

      render(this.#newPointComponent, this.#container, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#handleDocumentEscKeydown);
    }
  }

  destroy = ({ isCanceled = true } = {}) => {
    if (this.#newPointComponent) {
      remove(this.#newPointComponent);
      this.#newPointComponent = null;
      document.removeEventListener('keydown', this.#handleDocumentEscKeydown);

      this.#handleDestroy({ isCanceled });
    }
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );

    this.destroy({ isCanceled: false });
  };

  #handleFormClose = () => {
    this.destroy();
  };

  #handleDocumentEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
