export default class MongoAdapter {
  constructor(db) {
    this.db = db;
  }

  async findOne(collection, query) {
    return await this.db.collection(collection).findOne(query);
  }

  async findMany(collection, query) {
    return await this.db.collection(collection).findMany(query);
  }

  async insertOne(collection, doc) {
    await this.db.collection(collection).insertOne(doc);
  }

  async updateOne(collection, id, update) {
    await this.db.collection(collection).updateOne({ id }, { $set: update });
  }

  async deleteOne(collection, id) {
    await this.db.collection(collection).deleteOne({ id });
  }
}
