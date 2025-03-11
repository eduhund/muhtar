import { getProjection } from "./utils.js";

export default class MongoAdapter {
  constructor(db) {
    this.db = db;
  }

  async findOne(collection, query, returns) {
    const data = await this.db
      .collection(collection)
      .findOne(query, { projecion: getProjection(returns) });

    return data ? this.normalize(data) : null;
  }

  async findMany(collection, query, returns) {
    const data = await this.db
      .collection(collection)
      .findMany(query, { projecion: getProjection(returns) });

    return data.map(this.normalize);
  }

  async insertOne(collection, doc) {
    const { id, ...data } = doc;
    await this.db.collection(collection).insertOne({ _id: id, ...data });
  }

  async updateOne(collection, newDoc) {
    const { id, ...update } = newDoc;
    await this.db
      .collection(collection)
      .updateOne({ _id: id }, { $set: update });
  }

  async deleteOne(collection, id) {
    await this.db.collection(collection).deleteOne({ id });
  }

  normalize(document) {
    if (!document) return null;
    const { _id, ...rest } = document;
    return { id: _id.toString(), ...rest };
  }
}
