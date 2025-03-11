export default class BaseModel {
  constructor({ _id, id }) {
    this.id = _id || id || null;
  }
}
