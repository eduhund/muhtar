export default class BaseModel {
  static initDb(db) {
    this.db = db;
  }

  static async getCollection() {
    if (!this.db) {
      throw new Error("Database not initialized");
    }
    return this.db.collection(this.collectionName);
  }

  async save() {
    const collection = await this.constructor.getCollection();

    if (!this.id) {
      throw new Error("ID must be assigned before saving");
    }

    const data = { ...this, _id: this.id };
    delete data.id;

    await collection.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
  }

  async delete() {
    const collection = this.constructor.getCollection();
    await collection.deleteOne({ _id: this.id });
  }
}
