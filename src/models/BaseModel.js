import { adapter } from "../controllers/mongo/mongo.js";

export default class BaseModel {
  constructor(id, collection) {
    this._dbAdapter = adapter;
    this._collection = collection;
    this._id = id;
  }

  getId() {
    return this._id;
  }

  async _save(update) {
    return this._dbAdapter.update(this._collection, this._id, update);
  }

  async saveChanges(params) {
    if (!params) return this._save(this);
    if (typeof params === "string")
      return this._save({ [paramName]: this[paramName] });
    if (Array.isArray(params)) {
      const update = {};
      for (const param of params) {
        update[param] = this[param];
      }
      return this._save(update);
    }
    return this;
  }
}
