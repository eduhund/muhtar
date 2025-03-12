import { getProjection } from "./utils.js";

export default class MongoAdapter {
  constructor(db) {
    this.db = db;
  }

  async findOne(collection, query, returns) {
    return this.db.collection(collection).findOne(query, {
      projecion: getProjection(returns),
    });
  }

  async findMany(collection, query, returns) {
    return this.db
      .collection(collection)
      .find(query, {
        projecion: getProjection(returns),
      })
      .toArray();
  }

  async insert(collection, doc) {
    await this.db.collection(collection).insertOne(doc);
  }

  async update(collection, _id, update) {
    await this.db.collection(collection).updateOne({ _id }, { $set: update });
  }

  async delete(collection, id) {
    await this.db.collection(collection).deleteOne({ id });
  }
}
