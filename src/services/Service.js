export default class Service {
  constructor(adapter, collection) {
    this._dbAdapter = adapter;
    this._collection = collection;
  }

  async _findOne(query, returns) {
    return this._dbAdapter.findOne(this._collection, query, returns);
  }

  async _findMany(query, returns) {
    return this._dbAdapter.findMany(this._collection, query, returns);
  }
}
